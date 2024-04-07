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
      // creating clint id
      const clientId = `mqtt_${Math.random().toString(16).slice(3)}`;

      // getting url data from config file
      const connectUrl = `${MqttConfig.protocol}://${MqttConfig.host}:${MqttConfig.port}`;

      const { clean, connectTimeout, username, password, reconnectPeriod } =
        MqttConfig;

      // if you need to add something else, just modify
      // this func, don`t forget to add setting in config
      const client = connect(connectUrl, {
        clientId,
        clean: clean,
        connectTimeout: connectTimeout,
        username: username,
        password: password,
        reconnectPeriod: reconnectPeriod,
      });

      //  main listeners
      client.on('connect', () => {
        console.log('MQTT connected');
      });

      client.on('disconnect', () => {
        console.log('MQTT disconnected');
      });

      client.on('error', () => {
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
