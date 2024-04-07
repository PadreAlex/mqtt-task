import { Inject, Injectable } from '@nestjs/common';
import { MQTT_CLIENT_INSTANCE } from './mqtt.constants';
import { Packet, IClientPublishOptions, IClientSubscribeOptions, ISubscriptionGrant, MqttClient } from 'mqtt';

@Injectable()
export class MqttService {
  constructor(
    @Inject(MQTT_CLIENT_INSTANCE) private readonly client: MqttClient,
  ) {}

  subscribe(topic: string | string[], opts?: IClientSubscribeOptions): Promise<ISubscriptionGrant[]> {
    return new Promise((resolve, reject) => {
      this.client.subscribe(topic, opts || null, (err, granted) => {
        if (err) {
          reject(err);
        } else {
          resolve(granted);
        }
      });
    });
  }

  publish(topic: string, message: string | Buffer | object, opts?: IClientPublishOptions): Promise<Packet> {
    return new Promise<Packet>((resolve, reject) => {
      if (typeof message === 'object') {
        message = JSON.stringify(message);
      }
      this.client.publish(topic, message, opts || null, (error, packet) => {
        if (error) {
          reject(error);
        } else {
          resolve(packet);
        }
      });
    });
  }
}
