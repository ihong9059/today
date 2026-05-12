#include "cc1101.h"
#include "cc1101_regs.h"
#include <zephyr/logging/log.h>

LOG_MODULE_REGISTER(cc1101, LOG_LEVEL_INF);

/* ---- SPI helpers ---- */

static void spi_write_byte(struct cc1101_dev *dev, uint8_t addr, uint8_t val)
{
    uint8_t tx[2] = { addr | CC1101_WRITE, val };
    struct spi_buf tx_buf = { .buf = tx, .len = 2 };
    struct spi_buf_set tx_set = { .buffers = &tx_buf, .count = 1 };
    spi_write(dev->spi, &dev->spi_cfg, &tx_set);
}

static uint8_t spi_read_byte(struct cc1101_dev *dev, uint8_t addr)
{
    uint8_t tx[2] = { addr | CC1101_READ, 0 };
    uint8_t rx[2] = { 0 };
    struct spi_buf tx_buf = { .buf = tx, .len = 2 };
    struct spi_buf rx_buf = { .buf = rx, .len = 2 };
    struct spi_buf_set tx_set = { .buffers = &tx_buf, .count = 1 };
    struct spi_buf_set rx_set = { .buffers = &rx_buf, .count = 1 };
    spi_transceive(dev->spi, &dev->spi_cfg, &tx_set, &rx_set);
    return rx[1];
}

static uint8_t spi_read_status_reg(struct cc1101_dev *dev, uint8_t addr)
{
    uint8_t tx[2] = { addr | CC1101_READ | CC1101_BURST, 0 };
    uint8_t rx[2] = { 0 };
    struct spi_buf tx_buf = { .buf = tx, .len = 2 };
    struct spi_buf rx_buf = { .buf = rx, .len = 2 };
    struct spi_buf_set tx_set = { .buffers = &tx_buf, .count = 1 };
    struct spi_buf_set rx_set = { .buffers = &rx_buf, .count = 1 };
    spi_transceive(dev->spi, &dev->spi_cfg, &tx_set, &rx_set);
    return rx[1];
}

static void spi_strobe(struct cc1101_dev *dev, uint8_t cmd)
{
    uint8_t tx = cmd;
    struct spi_buf tx_buf = { .buf = &tx, .len = 1 };
    struct spi_buf_set tx_set = { .buffers = &tx_buf, .count = 1 };
    spi_write(dev->spi, &dev->spi_cfg, &tx_set);
}

static void spi_write_burst(struct cc1101_dev *dev, uint8_t addr,
                             const uint8_t *buf, uint8_t len)
{
    uint8_t hdr = addr | CC1101_WRITE | CC1101_BURST;
    struct spi_buf tx_bufs[2] = {
        { .buf = &hdr, .len = 1 },
        { .buf = (void *)buf, .len = len },
    };
    struct spi_buf_set tx_set = { .buffers = tx_bufs, .count = 2 };
    spi_write(dev->spi, &dev->spi_cfg, &tx_set);
}

static void spi_read_burst(struct cc1101_dev *dev, uint8_t addr,
                            uint8_t *buf, uint8_t len)
{
    uint8_t hdr = addr | CC1101_READ | CC1101_BURST;
    uint8_t dummy[65] = { 0 };

    struct spi_buf tx_bufs[2] = {
        { .buf = &hdr, .len = 1 },
        { .buf = dummy, .len = len },
    };
    struct spi_buf rx_bufs[2] = {
        { .buf = dummy, .len = 1 },
        { .buf = buf, .len = len },
    };
    struct spi_buf_set tx_set = { .buffers = tx_bufs, .count = 2 };
    struct spi_buf_set rx_set = { .buffers = rx_bufs, .count = 2 };
    spi_transceive(dev->spi, &dev->spi_cfg, &tx_set, &rx_set);
}

/* ---- Public API ---- */

void cc1101_write_reg(struct cc1101_dev *dev, uint8_t addr, uint8_t val)
{
    spi_write_byte(dev, addr, val);
}

uint8_t cc1101_read_reg(struct cc1101_dev *dev, uint8_t addr)
{
    return spi_read_byte(dev, addr);
}

uint8_t cc1101_read_status(struct cc1101_dev *dev, uint8_t addr)
{
    return spi_read_status_reg(dev, addr);
}

void cc1101_strobe(struct cc1101_dev *dev, uint8_t cmd)
{
    spi_strobe(dev, cmd);
}

/*
 * CC1101 register configuration for 433.92 MHz, 38.4 kbps, 2-FSK
 */
static const struct {
    uint8_t addr;
    uint8_t val;
} cc1101_config[] = {
    { CC1101_IOCFG2,   0x29 },  /* GDO2: CHIP_RDYn */
    { CC1101_IOCFG1,   0x2E },  /* GDO1: Hi-Z (tristate) */
    { CC1101_IOCFG0,   0x06 },  /* GDO0: asserts on sync, deasserts on EOP */
    { CC1101_FIFOTHR,  0x07 },  /* RX FIFO threshold: 32 bytes */
    { CC1101_PKTLEN,   0x04 },  /* Fixed packet length: 4 bytes */
    { CC1101_PKTCTRL1, 0x04 },  /* Append status (RSSI+LQI), no addr check */
    { CC1101_PKTCTRL0, 0x04 },  /* Fixed length mode, CRC enabled */
    { CC1101_ADDR,     0x00 },
    { CC1101_CHANNR,   0x00 },
    { CC1101_FSCTRL1,  0x08 },
    { CC1101_FSCTRL0,  0x00 },
    /* 433.92 MHz: FREQ = 433.92e6 / (26e6/65536) = 0x10B071 */
    { CC1101_FREQ2,    0x10 },
    { CC1101_FREQ1,    0xB0 },
    { CC1101_FREQ0,    0x71 },
    /* 38.4 kbps, channel BW ~325 kHz */
    { CC1101_MDMCFG4,  0xCA },
    { CC1101_MDMCFG3,  0x83 },
    { CC1101_MDMCFG2,  0x13 },  /* 30/32 sync, 2-FSK */
    { CC1101_MDMCFG1,  0x22 },  /* 4 preamble bytes */
    { CC1101_MDMCFG0,  0xF8 },
    { CC1101_DEVIATN,  0x35 },  /* Deviation ~20 kHz */
    { CC1101_MCSM1,    0x30 },  /* After TX/RX -> IDLE */
    { CC1101_MCSM0,    0x18 },  /* Auto-cal from IDLE to RX/TX */
    { CC1101_FOCCFG,   0x16 },
    { CC1101_BSCFG,    0x6C },
    { CC1101_AGCCTRL2, 0x43 },
    { CC1101_AGCCTRL1, 0x40 },
    { CC1101_AGCCTRL0, 0x91 },
    { CC1101_FREND1,   0x56 },
    { CC1101_FREND0,   0x10 },
    { CC1101_FSCAL3,   0xE9 },
    { CC1101_FSCAL2,   0x2A },
    { CC1101_FSCAL1,   0x00 },
    { CC1101_FSCAL0,   0x1F },
    { CC1101_TEST2,    0x81 },
    { CC1101_TEST1,    0x35 },
    { CC1101_TEST0,    0x09 },
};

/* PA table: 10 dBm for 433 MHz */
static const uint8_t pa_table[8] = {
    0xC0, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00
};

int cc1101_init(struct cc1101_dev *dev)
{
    if (!device_is_ready(dev->spi)) {
        LOG_ERR("SPI device not ready");
        return -ENODEV;
    }

    /* Reset */
    k_usleep(100);
    cc1101_strobe(dev, CC1101_SRES);
    k_msleep(10);

    /* Verify chip identity */
    uint8_t partnum = cc1101_read_status(dev, CC1101_PARTNUM);
    uint8_t version = cc1101_read_status(dev, CC1101_VERSION);
    LOG_INF("CC1101 PARTNUM=0x%02X VERSION=0x%02X", partnum, version);

    if (version == 0x00 || version == 0xFF) {
        LOG_ERR("CC1101 not responding (VERSION=0x%02X)", version);
        return -EIO;
    }

    /* Write configuration registers */
    for (int i = 0; i < ARRAY_SIZE(cc1101_config); i++) {
        cc1101_write_reg(dev, cc1101_config[i].addr, cc1101_config[i].val);
    }

    /* Write PA table */
    spi_write_burst(dev, 0x3E, pa_table, sizeof(pa_table));

    /* Calibrate */
    cc1101_strobe(dev, CC1101_SCAL);
    k_msleep(1);

    LOG_INF("CC1101 init OK (433.92 MHz, 38.4 kbps)");
    return 0;
}

int cc1101_send_packet(struct cc1101_dev *dev, const uint8_t *buf, uint8_t len)
{
    cc1101_strobe(dev, CC1101_SIDLE);
    cc1101_strobe(dev, CC1101_SFTX);

    spi_write_burst(dev, CC1101_TXFIFO, buf, len);
    cc1101_strobe(dev, CC1101_STX);

    /* Wait for TX to complete */
    k_msleep(20);

    cc1101_strobe(dev, CC1101_SIDLE);
    return 0;
}

int cc1101_read_packet(struct cc1101_dev *dev, uint8_t *buf, uint8_t max_len)
{
    uint8_t rx_bytes = cc1101_read_status(dev, CC1101_RXBYTES);
    uint8_t num = rx_bytes & 0x7F;

    if (num == 0) {
        return 0;
    }

    /* 4 payload + 2 appended status (RSSI + LQI|CRC_OK) */
    uint8_t expected = 4 + 2;
    if (num < expected) {
        cc1101_strobe(dev, CC1101_SIDLE);
        cc1101_strobe(dev, CC1101_SFRX);
        return -EIO;
    }

    uint8_t tmp[8];
    uint8_t read_len = (num > sizeof(tmp)) ? sizeof(tmp) : num;
    spi_read_burst(dev, CC1101_RXFIFO, tmp, read_len);

    uint8_t copy_len = (max_len < 4) ? max_len : 4;
    memcpy(buf, tmp, copy_len);

    cc1101_strobe(dev, CC1101_SIDLE);
    cc1101_strobe(dev, CC1101_SFRX);

    return copy_len;
}

void cc1101_set_rx_mode(struct cc1101_dev *dev)
{
    cc1101_strobe(dev, CC1101_SIDLE);
    cc1101_strobe(dev, CC1101_SFRX);
    cc1101_strobe(dev, CC1101_SRX);
}

int8_t cc1101_read_rssi(struct cc1101_dev *dev)
{
    uint8_t raw = cc1101_read_status(dev, CC1101_RSSI);
    int16_t rssi;
    if (raw >= 128) {
        rssi = (int16_t)(raw - 256) / 2 - 74;
    } else {
        rssi = (int16_t)raw / 2 - 74;
    }
    return (int8_t)rssi;
}
