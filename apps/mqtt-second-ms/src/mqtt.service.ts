import { Payload, Subscribe } from '@app/mqtt';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MqttService {
  @Subscribe({
    topic: 'test2',
    transform: payload => payload.toString(),
  })
  test(@Payload() payload) {
    console.log(payload);
  }
}
