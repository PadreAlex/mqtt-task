import { Provider, Logger } from '@nestjs/common';
import { connect } from 'mqtt';
import { MqttModuleOptions } from './mqtt.interface';
import {
  MQTT_CLIENT_INSTANCE,
  MQTT_OPTION_PROVIDER,
  MQTT_LOGGER_PROVIDER,
} from './mqtt.constants';
import { MqttConfig } from '@app/configuration';

export function createClientProvider(): Provider {
  return {
    provide: MQTT_CLIENT_INSTANCE,
    useFactory: () => {
      const clientId = `mqtt_${Math.random().toString(16).slice(3)}`;

      const connectUrl = `${MqttConfig.protocol}://${MqttConfig.host}:${MqttConfig.port}`;

      const { clean, connectTimeout, username, password, reconnectPeriod } =
        MqttConfig;

      const client = connect(connectUrl, {
        clientId,
        clean: clean,
        connectTimeout: connectTimeout,
        username: username,
        password: password,
        reconnectPeriod: reconnectPeriod,
      });

      client.on('connect', () => {
        console.log('MQTT connected');
      });

      client.on('disconnect', packet => {
        console.log('MQTT disconnected');
      });

      client.on('error', error => {
        console.log('MQTT connection error');
      });

      client.on('reconnect', () => {
        console.log('MQTT reconnecting');
      });

      client.on('offline', () => {
        console.log('MQTT offline');
      });

      return client;
    },
    inject: [MQTT_OPTION_PROVIDER, MQTT_LOGGER_PROVIDER],
  };
}
