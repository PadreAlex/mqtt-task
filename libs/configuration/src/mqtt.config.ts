import config from 'config';
import { IMqttConfig } from './interfaces';

export const MqttConfig =
  config.get<IMqttConfig>('mqttConfig');
