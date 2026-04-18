/**
 * @file    ble_ota.h
 * @brief   BLE OTA Service — NimBLE GATT 기반 무선 펌웨어 업데이트
 *
 * OTA Service UUID: 0000FE00-0000-1000-8000-00805F9B34FB
 *   OTA_CONTROL (FE01): Write — START/END/ABORT 명령
 *   OTA_DATA    (FE02): Write No Response — 펌웨어 chunk
 *   OTA_STATUS  (FE03): Notify — 진행 상태
 */

#ifndef BLE_OTA_H
#define BLE_OTA_H

#include <stdint.h>

// OTA Control 명령
#define OTA_CMD_START   0x01
#define OTA_CMD_END     0x02
#define OTA_CMD_ABORT   0x03

// OTA Status 코드
#define OTA_STATUS_IDLE      0x00
#define OTA_STATUS_READY     0x01
#define OTA_STATUS_RECEIVING 0x02
#define OTA_STATUS_VERIFYING 0x03
#define OTA_STATUS_SUCCESS   0x04
#define OTA_STATUS_CRC_FAIL  0x05
#define OTA_STATUS_WRITE_FAIL 0x06
#define OTA_STATUS_ABORT_OK  0x07

/**
 * @brief BLE OTA 서비스 초기화 + BLE 광고 시작
 */
void ble_ota_init(void);

#endif
