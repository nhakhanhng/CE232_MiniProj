#ifndef _WIFI_CONNECT_H_
#define _WIFI_CONNECT_H_

#include "esp_event.h"
#include "esp_wifi.h"
#define EXAMPLE_ESP_MAXIMUM_RETRY  5

#define WIFI_CONNECTED_BIT BIT0
#define WIFI_FAIL_BIT      BIT1

#define WIFI_SSID "UIT Public"
#define WIFI_PASS ""

// void event_handler(void* , esp_event_base_t , int32_t , void* );
void wifi_init_sta(void);
void wifi_stop_deinit(void);


#endif