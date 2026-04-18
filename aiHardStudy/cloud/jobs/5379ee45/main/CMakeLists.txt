idf_component_register(SRCS "main.c" "ble_ota.c"
                       INCLUDE_DIRS "."
                       REQUIRES bt app_update nvs_flash esp_partition
                       PRIV_REQUIRES esp_driver_gpio esp_driver_i2c driver)
