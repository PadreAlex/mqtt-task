import { MqttService, Payload, Subscribe } from '@app/mqtt';
import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
} from '@nestjs/common';
import { SendMessageDTO } from './dto';
import { TopicsConfig } from '@app/configuration';

@Injectable()
export class MqttSenderService {
  constructor(@Inject(MqttService) private readonly mqttService: MqttService) {}

  sendViaMQTT(body: SendMessageDTO) {
    try {
      if (!body.message)
        throw new BadRequestException('No message was found in request');

      if (typeof body.message !== 'string')
        throw new ConflictException('Message is not string type');

      this.mqttService.publish(TopicsConfig.mainTopic, body.message);

      return {
        response: `Message - ${body.message} was sended successfully`,
      };
    } catch (error) {
      return {
        response: `Error: ${(error as Error).message}`,
      };
    }
  }
}
