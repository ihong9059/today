/**
 * BLE OTA Service — NimBLE GATT 서버
 * ESP32-WROOM-32 용 BLE OTA 부트로더
 */

#include <stdio.h>
#include <string.h>
#include "freertos/FreeRTOS.h"
#include "freertos/task.h"
#include "esp_log.h"
#include "esp_ota_ops.h"
#include "esp_partition.h"
#include "nvs_flash.h"

#include "nimble/nimble_port.h"
#include "nimble/nimble_port_freertos.h"
#include "host/ble_hs.h"
#include "host/util/util.h"
#include "services/gap/ble_svc_gap.h"
#include "services/gatt/ble_svc_gatt.h"

#include "ble_ota.h"

static const char *TAG = "BLE_OTA";

// OTA 상태
static esp_ota_handle_t ota_handle = 0;
static const esp_partition_t *update_partition = NULL;
static bool ota_in_progress = false;
static uint32_t ota_total_size = 0;
static uint32_t ota_received = 0;

// BLE 핸들
static uint16_t ota_status_handle;
static uint16_t conn_handle = BLE_HS_CONN_HANDLE_NONE;

// No-op store 콜백 (IRK 크래시 방지 — NimBLE이 NULL 콜백 호출 시 크래시)
static int store_read_noop(int obj_type, const union ble_store_key *key,
                            union ble_store_value *val)
{
    return BLE_HS_ENOENT;  // "없음" 반환
}

static int store_write_noop(int obj_type, const union ble_store_value *val)
{
    return 0;  // 성공 (버림)
}

static int store_delete_noop(int obj_type, const union ble_store_key *key)
{
    return 0;
}

// UUID 정의
static const ble_uuid128_t ota_svc_uuid =
    BLE_UUID128_INIT(0xFB, 0x34, 0x9B, 0x5F, 0x80, 0x00, 0x00, 0x80,
                     0x00, 0x10, 0x00, 0x00, 0x00, 0xFE, 0x00, 0x00);

static const ble_uuid128_t ota_ctrl_uuid =
    BLE_UUID128_INIT(0xFB, 0x34, 0x9B, 0x5F, 0x80, 0x00, 0x00, 0x80,
                     0x00, 0x10, 0x00, 0x00, 0x01, 0xFE, 0x00, 0x00);

static const ble_uuid128_t ota_data_uuid =
    BLE_UUID128_INIT(0xFB, 0x34, 0x9B, 0x5F, 0x80, 0x00, 0x00, 0x80,
                     0x00, 0x10, 0x00, 0x00, 0x02, 0xFE, 0x00, 0x00);

static const ble_uuid128_t ota_status_uuid =
    BLE_UUID128_INIT(0xFB, 0x34, 0x9B, 0x5F, 0x80, 0x00, 0x00, 0x80,
                     0x00, 0x10, 0x00, 0x00, 0x03, 0xFE, 0x00, 0x00);


// 상태 Notify 전송
static void send_status(uint8_t status, uint8_t progress)
{
    if (conn_handle == BLE_HS_CONN_HANDLE_NONE) return;

    uint8_t data[2] = {status, progress};
    struct os_mbuf *om = ble_hs_mbuf_from_flat(data, 2);
    if (om) {
        ble_gatts_notify_custom(conn_handle, ota_status_handle, om);
    }
}


// OTA_CONTROL Write 핸들러
static int ota_ctrl_write(struct os_mbuf *om)
{
    uint8_t buf[64];
    uint16_t len = OS_MBUF_PKTLEN(om);
    if (len < 1 || len > sizeof(buf)) return BLE_ATT_ERR_INVALID_ATTR_VALUE_LEN;
    os_mbuf_copydata(om, 0, len, buf);

    uint8_t cmd = buf[0];

    if (cmd == OTA_CMD_START) {
        // START: [0x01] [total_size: 4B LE]
        if (len >= 5) {
            ota_total_size = buf[1] | (buf[2] << 8) | (buf[3] << 16) | (buf[4] << 24);
        } else {
            ota_total_size = 0;
        }

        ESP_LOGI(TAG, "OTA START, size=%lu", (unsigned long)ota_total_size);

        update_partition = esp_ota_get_next_update_partition(NULL);
        if (!update_partition) {
            ESP_LOGE(TAG, "No OTA partition found");
            send_status(OTA_STATUS_WRITE_FAIL, 0);
            return 0;
        }

        esp_err_t err = esp_ota_begin(update_partition, OTA_WITH_SEQUENTIAL_WRITES, &ota_handle);
        if (err != ESP_OK) {
            ESP_LOGE(TAG, "esp_ota_begin failed: %s", esp_err_to_name(err));
            send_status(OTA_STATUS_WRITE_FAIL, 0);
            return 0;
        }

        ota_in_progress = true;
        ota_received = 0;
        send_status(OTA_STATUS_READY, 0);

    } else if (cmd == OTA_CMD_END) {
        if (!ota_in_progress) return 0;

        ESP_LOGI(TAG, "OTA END, received=%lu", (unsigned long)ota_received);
        send_status(OTA_STATUS_VERIFYING, 100);

        esp_err_t err = esp_ota_end(ota_handle);
        if (err != ESP_OK) {
            ESP_LOGE(TAG, "esp_ota_end failed: %s", esp_err_to_name(err));
            ota_in_progress = false;
            send_status(OTA_STATUS_CRC_FAIL, 0);
            return 0;
        }

        err = esp_ota_set_boot_partition(update_partition);
        if (err != ESP_OK) {
            ESP_LOGE(TAG, "esp_ota_set_boot_partition failed: %s", esp_err_to_name(err));
            ota_in_progress = false;
            send_status(OTA_STATUS_WRITE_FAIL, 0);
            return 0;
        }

        ota_in_progress = false;
        send_status(OTA_STATUS_SUCCESS, 100);
        ESP_LOGI(TAG, "OTA SUCCESS! Restarting in 2 seconds...");

        vTaskDelay(2000 / portTICK_PERIOD_MS);
        esp_restart();

    } else if (cmd == OTA_CMD_ABORT) {
        ESP_LOGW(TAG, "OTA ABORT");
        if (ota_in_progress) {
            esp_ota_abort(ota_handle);
            ota_in_progress = false;
        }
        send_status(OTA_STATUS_ABORT_OK, 0);
    }

    return 0;
}


// OTA_DATA Write 핸들러 (Write Without Response)
static int ota_data_write(struct os_mbuf *om)
{
    if (!ota_in_progress) return 0;

    uint16_t len = OS_MBUF_PKTLEN(om);
    uint8_t *buf = malloc(len);
    if (!buf) return BLE_ATT_ERR_INSUFFICIENT_RES;

    os_mbuf_copydata(om, 0, len, buf);

    esp_err_t err = esp_ota_write(ota_handle, buf, len);
    free(buf);

    if (err != ESP_OK) {
        ESP_LOGE(TAG, "esp_ota_write failed: %s", esp_err_to_name(err));
        send_status(OTA_STATUS_WRITE_FAIL, 0);
        return 0;
    }

    ota_received += len;

    // 진행률 알림 (2KB마다)
    if (ota_total_size > 0 && (ota_received % 2048) < len) {
        uint8_t progress = (uint8_t)((uint64_t)ota_received * 100 / ota_total_size);
        send_status(OTA_STATUS_RECEIVING, progress);
    }

    return 0;
}


// GATT Access 콜백
static int ota_access_cb(uint16_t conn_handle_arg, uint16_t attr_handle,
                          struct ble_gatt_access_ctxt *ctxt, void *arg)
{
    if (ctxt->op == BLE_GATT_ACCESS_OP_WRITE_CHR) {
        if (ble_uuid_cmp(ctxt->chr->uuid, &ota_ctrl_uuid.u) == 0) {
            return ota_ctrl_write(ctxt->om);
        }
        if (ble_uuid_cmp(ctxt->chr->uuid, &ota_data_uuid.u) == 0) {
            return ota_data_write(ctxt->om);
        }
    }
    return 0;
}


// GATT 서비스 정의
static const struct ble_gatt_svc_def ota_svcs[] = {
    {
        .type = BLE_GATT_SVC_TYPE_PRIMARY,
        .uuid = &ota_svc_uuid.u,
        .characteristics = (struct ble_gatt_chr_def[]) {
            {
                // OTA_CONTROL — Write
                .uuid = &ota_ctrl_uuid.u,
                .access_cb = ota_access_cb,
                .flags = BLE_GATT_CHR_F_WRITE,
            },
            {
                // OTA_DATA — Write Without Response
                .uuid = &ota_data_uuid.u,
                .access_cb = ota_access_cb,
                .flags = BLE_GATT_CHR_F_WRITE_NO_RSP,
            },
            {
                // OTA_STATUS — Notify
                .uuid = &ota_status_uuid.u,
                .access_cb = ota_access_cb,
                .val_handle = &ota_status_handle,
                .flags = BLE_GATT_CHR_F_NOTIFY,
            },
            {0}, // 종료
        },
    },
    {0}, // 종료
};


// GAP 이벤트 핸들러
static int gap_event_cb(struct ble_gap_event *event, void *arg)
{
    switch (event->type) {
    case BLE_GAP_EVENT_CONNECT:
        ESP_LOGI(TAG, "Connected, handle=%d", event->connect.conn_handle);
        conn_handle = event->connect.conn_handle;
        break;

    case BLE_GAP_EVENT_DISCONNECT:
        ESP_LOGI(TAG, "Disconnected");
        conn_handle = BLE_HS_CONN_HANDLE_NONE;
        // OTA 중 끊기면 중단
        if (ota_in_progress) {
            esp_ota_abort(ota_handle);
            ota_in_progress = false;
            ESP_LOGW(TAG, "OTA aborted due to disconnect");
        }
        // 광고 재시작
        ble_ota_init();
        break;

    case BLE_GAP_EVENT_MTU:
        ESP_LOGI(TAG, "MTU updated: %d", event->mtu.value);
        break;

    default:
        break;
    }
    return 0;
}


// BLE 광고 시작
static const char *DEVICE_NAME = "ESP32-OTA";

static void start_advertising(void)
{
    struct ble_gap_adv_params adv_params = {0};
    struct ble_hs_adv_fields fields = {0};

    fields.flags = BLE_HS_ADV_F_DISC_GEN | BLE_HS_ADV_F_BREDR_UNSUP;
    fields.name = (const uint8_t *)DEVICE_NAME;
    fields.name_len = strlen(DEVICE_NAME);
    fields.name_is_complete = 1;

    int rc = ble_gap_adv_set_fields(&fields);
    if (rc != 0) {
        ESP_LOGE(TAG, "ble_gap_adv_set_fields failed: %d", rc);
        return;
    }

    adv_params.conn_mode = BLE_GAP_CONN_MODE_UND;
    adv_params.disc_mode = BLE_GAP_DISC_MODE_GEN;

    rc = ble_gap_adv_start(BLE_OWN_ADDR_PUBLIC, NULL, BLE_HS_FOREVER,
                           &adv_params, gap_event_cb, NULL);
    if (rc != 0) {
        ESP_LOGE(TAG, "ble_gap_adv_start failed: %d", rc);
        return;
    }

    ESP_LOGI(TAG, "BLE Advertising started: %s", DEVICE_NAME);
}


// NimBLE Host Task
static void nimble_host_task(void *param)
{
    nimble_port_run();
    nimble_port_freertos_deinit();
}


// BLE sync 콜백
static void on_sync(void)
{
    uint8_t own_addr_type;
    int rc = ble_hs_id_infer_auto(0, &own_addr_type);
    if (rc != 0) {
        ESP_LOGE(TAG, "ble_hs_id_infer_auto failed: %d", rc);
        return;
    }
    start_advertising();
}


// BLE OTA 초기화
void ble_ota_init(void)
{
    static bool initialized = false;

    if (!initialized) {
        esp_err_t ret = nimble_port_init();
        if (ret != ESP_OK) {
            ESP_LOGE(TAG, "nimble_port_init failed: %s", esp_err_to_name(ret));
            return;
        }

        ble_svc_gap_device_name_set("ESP32-OTA");
        ble_svc_gap_init();
        ble_svc_gatt_init();

        ble_gatts_count_cfg(ota_svcs);
        ble_gatts_add_svcs(ota_svcs);

        // No-op store 콜백 설정 (IRK 크래시 방지 — NULL 대신 빈 함수)
        ble_hs_cfg.store_read_cb = store_read_noop;
        ble_hs_cfg.store_write_cb = store_write_noop;
        ble_hs_cfg.store_delete_cb = store_delete_noop;
        ble_hs_cfg.store_status_cb = NULL;  // status는 optional, NULL 허용

        // Security/Bonding 비활성화 (OTA에 불필요)
        ble_hs_cfg.sm_bonding = 0;
        ble_hs_cfg.sm_mitm = 0;
        ble_hs_cfg.sm_sc = 0;
        ble_hs_cfg.sm_our_key_dist = 0;
        ble_hs_cfg.sm_their_key_dist = 0;

        ble_hs_cfg.sync_cb = on_sync;

        nimble_port_freertos_init(nimble_host_task);
        initialized = true;

        ESP_LOGI(TAG, "BLE OTA initialized");
    } else {
        // 재연결 시 광고만 재시작
        start_advertising();
    }
}
