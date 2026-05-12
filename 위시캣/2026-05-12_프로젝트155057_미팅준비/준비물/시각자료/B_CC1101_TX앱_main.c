#include <zephyr/kernel.h>
#include <zephyr/drivers/gpio.h>
#include <zephyr/drivers/spi.h>
#include <zephyr/logging/log.h>
#include "cc1101_ook.h"

LOG_MODULE_REGISTER(tx_ook_app, LOG_LEVEL_INF);

static const struct device *spi_dev = DEVICE_DT_GET(DT_NODELABEL(spi3));
static const struct gpio_dt_spec cs_gpio = GPIO_DT_SPEC_GET_BY_IDX(
	DT_NODELABEL(spi3), cs_gpios, 0);

static const struct gpio_dt_spec buttons[] = {
	GPIO_DT_SPEC_GET(DT_ALIAS(sw0), gpios),
	GPIO_DT_SPEC_GET(DT_ALIAS(sw1), gpios),
	GPIO_DT_SPEC_GET(DT_ALIAS(sw2), gpios),
	GPIO_DT_SPEC_GET(DT_ALIAS(sw3), gpios),
};
#define NUM_BUTTONS ARRAY_SIZE(buttons)

static const struct gpio_dt_spec led = GPIO_DT_SPEC_GET(DT_ALIAS(led0), gpios);

static struct cc1101_dev cc;
static uint8_t seq_num;

static struct gpio_callback btn_cb_data[NUM_BUTTONS];
static volatile int pressed_btn = -1;

static void button_pressed(const struct device *dev, struct gpio_callback *cb, uint32_t pins)
{
	for (int i = 0; i < NUM_BUTTONS; i++) {
		if (pins & BIT(buttons[i].pin)) {
			pressed_btn = i + 1;
			break;
		}
	}
}

int main(void)
{
	printk("\n========================================\n");
	printk("  ROLE: TX (OOK)  |  S/N: 210\n");
	printk("========================================\n");
	LOG_INF("=== CC1101 TX Demo (ASK/OOK) ===");

	cc.spi = spi_dev;
	cc.spi_cfg.frequency = 6000000;
	cc.spi_cfg.operation = SPI_WORD_SET(8) | SPI_TRANSFER_MSB;
	cc.cs_ctrl.gpio = cs_gpio;
	cc.cs_ctrl.delay = 0;
	cc.spi_cfg.cs = cc.cs_ctrl;

	int ret = cc1101_ook_init(&cc);
	if (ret) {
		LOG_ERR("CC1101 init failed: %d", ret);
		return ret;
	}

	gpio_pin_configure_dt(&led, GPIO_OUTPUT_INACTIVE);

	for (int i = 0; i < NUM_BUTTONS; i++) {
		gpio_pin_configure_dt(&buttons[i], GPIO_INPUT);
		gpio_pin_interrupt_configure_dt(&buttons[i], GPIO_INT_EDGE_TO_ACTIVE);
		gpio_init_callback(&btn_cb_data[i], button_pressed, BIT(buttons[i].pin));
		gpio_add_callback(buttons[i].port, &btn_cb_data[i]);
	}

	LOG_INF("Ready. Press buttons 1-4 to send (ASK/OOK).");

	while (1) {
		if (pressed_btn > 0) {
			int btn = pressed_btn;
			pressed_btn = -1;

			uint8_t pkt[4];

			pkt[0] = 0x03;
			pkt[1] = (uint8_t)btn;
			pkt[2] = seq_num++;
			pkt[3] = pkt[1] ^ pkt[2];

			cc1101_ook_send_packet(&cc, pkt, 4);

			gpio_pin_toggle_dt(&led);
			LOG_INF("TX(OOK): Button %d (seq=%d)", btn, pkt[2]);

			k_msleep(200);
		}
		k_msleep(10);
	}
	return 0;
}
