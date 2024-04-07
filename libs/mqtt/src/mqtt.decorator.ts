import { CustomDecorator, SetMetadata } from '@nestjs/common';
import {
  MQTT_SUBSCRIBE_OPTIONS,
  MQTT_SUBSCRIBER_PARAMS,
} from './mqtt.constants';
import {
  MqttMessageTransformer,
  MqttSubscribeOptions,
  MqttSubscriberParameter,
} from './mqtt.interface';

export function Subscribe(topic: string | string[] | MqttSubscribeOptions): CustomDecorator;
export function Subscribe(topicOrOptions): CustomDecorator {
  if (typeof topicOrOptions === 'string' || Array.isArray(topicOrOptions)) {
    return SetMetadata(MQTT_SUBSCRIBE_OPTIONS, {
      topic: topicOrOptions,
    });
  } else {
    return SetMetadata(MQTT_SUBSCRIBE_OPTIONS, topicOrOptions);
  }
}

function SetParameter(parameter: Partial<MqttSubscriberParameter>) {
  return (
    target: object,
    propertyKey: string | symbol,
    paramIndex: number,
  ) => {
    const params =
      Reflect.getMetadata(MQTT_SUBSCRIBER_PARAMS, target[propertyKey]) || [];
    params.push({
      index: paramIndex,
      ...parameter,
    });
    Reflect.defineMetadata(MQTT_SUBSCRIBER_PARAMS, params, target[propertyKey]);
  };
}

export function Topic() {
  return SetParameter({
    type: 'topic',
  });
}

export function Packet() {
  return SetParameter({
    type: 'packet',
  });
}

export function Payload(transform?: 'json' | 'text' | MqttMessageTransformer) {
  return SetParameter({
    type: 'payload',
    transform,
  });
}

function Params() {
  return SetParameter({
    type: 'params',
  });
}
