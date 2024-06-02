#include <stdio.h>
#include "dht11.h"
#include "ssd1306.h"
#include "wifi_connect.h"
#include "http.h"
#include "nvs_flash.h"
#include "driver/i2c.h"
#include "mqtt.h"
#include "esp_log.h"
#include <esp_random.h>

#define PUB_TOPIC           "CE232/LAB05"
#define SDA_PIN 21
#define SCL_PIN 22
void i2c_master_init()
{
	i2c_config_t i2c_config = {
		.mode = I2C_MODE_MASTER,
		.sda_io_num = SDA_PIN,
		.scl_io_num = SCL_PIN,
		.sda_pullup_en = GPIO_PULLUP_ENABLE,
		.scl_pullup_en = GPIO_PULLUP_ENABLE,
		.master.clk_speed = 400000};
	i2c_param_config(I2C_NUM_0, &i2c_config);
	i2c_driver_install(I2C_NUM_0, I2C_MODE_MASTER, 0, 0, 0);
}

void app_main(void)
{
    esp_err_t ret;

    /* Initialize NVS. */
    ret = nvs_flash_init();
    if (ret == ESP_ERR_NVS_NO_FREE_PAGES)
    {
        ESP_ERROR_CHECK(nvs_flash_erase());
        ret = nvs_flash_init();
    }
    ESP_ERROR_CHECK(ret);
    ESP_ERROR_CHECK(ret);
    /* Initialize the underlying TCP/IP stack */
    ESP_ERROR_CHECK(esp_netif_init());
    /* Create default event loop */
    ESP_ERROR_CHECK(esp_event_loop_create_default());
    /* Creates default WIFI STA */
    esp_netif_create_default_wifi_sta();
    wifi_init_sta();
    mqtt_app_start();
    DHT11_init(5);
    i2c_master_init();
    ssd1306_init();
    int temp;
    int hum;
    char LCD_Buffer[50];
    char Pub_Buffer[50];
    while (1)
    {
        ESP_LOGI("DHT", "Temp: %d", DHT11_read().temperature);

        ESP_LOGI("DHT", "Hemi: %d", DHT11_read().humidity);
        temp = DHT11_read().temperature;
        hum = DHT11_read().humidity;
        // temp = 11 + esp_random()%10;
        // hum = 90 + esp_random()%10;
        if (temp == -1 || hum == -1)
        {
            vTaskDelay(20000 / portTICK_PERIOD_MS);
            continue;
        }
        sprintf(LCD_Buffer,"Temperature:%d,\nHumidity:%d\n", temp, hum);
        sprintf(Pub_Buffer, "{\"temperature\":%d,\"humidity\":%d}", temp, hum);
        task_ssd1306_display_clear();
        task_ssd1306_display_text(LCD_Buffer);
        // http_post(APP_URL,HTTP_Buffer);
        mqtt_client_publish(PUB_TOPIC,Pub_Buffer);
        vTaskDelay(10000 / portTICK_PERIOD_MS);
    }
}