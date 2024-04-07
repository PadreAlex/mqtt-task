import { MqttService } from '@app/mqtt';
import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { SendMessageDTO } from './dto';
import { TopicsConfig } from '@app/configuration';

@Injectable()
export class MqttSenderService {
  private readonly logger = new Logger(MqttSenderService.name);

  constructor(@Inject(MqttService) private readonly mqttService: MqttService) {}

  /**
   * @explained
   * this function sends a message via
   * MQTT in a set topic, topic is set in config
   * @param {SendMessageDTO} body - in general, this is {message: string}
   */
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
      this.logger.error((error as Error).message);
    }
  }
}
