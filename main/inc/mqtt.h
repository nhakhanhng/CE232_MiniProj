#ifndef _MQTT_H_
#define _MQTT_H_

#define MQTT_BROKER         "mqtt://mqtt.flespi.io:1883"
#define MQTT_PORT           1883
#define MQTT_TOKEN          "etsIt8ezRsR0tVJVNdMydJRhIOlR2FINMx5H2eqZrTsMcVPNW2TAa6Z4HyrLZ0Qr"

void mqtt_app_start(void);
uint8_t mqtt_client_publish(const char *topic, const char *message);

#endif