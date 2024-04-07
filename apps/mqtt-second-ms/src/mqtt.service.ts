import { TopicsConfig } from '@app/configuration';
import { MessageEntity } from '@app/entities';
import { Payload, Subscribe } from '@app/mqtt';
import { PgService } from '@app/pg';
import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { Like } from 'typeorm';

@Injectable()
export class MqttService {
  private readonly logger = new Logger(MqttService.name);

  constructor(private readonly messageService: PgService) {}

  /**
   * @explained
   * this function listens to a MQTT messages
   * on a topic set in config
   * once message is caught - it is saved in db
   * @param {string} payload - message sent by MQTT
   */
  @Subscribe({
    topic: TopicsConfig.mainTopic,
    transform: payload => payload.toString(),
  })
  async saveMessage(@Payload() payload: string): Promise<void> {
    try {
      const newOrUpdateEntity: MessageEntity = await this.messageService.save(
        payload,
      );
      this.logger.log(
        `New message with UUID ${newOrUpdateEntity.id} is saved.`,
      );

      return;
    } catch (error) {
      this.logger.error((error as Error).message);
    }
  }

  /**
   * @explained
   * this function finds a message in db by:
   * @param {string} message - message in Like format
   */
  async findMessage(message: string): Promise<MessageEntity[]> {
    try {
      if (!message)
        throw new BadRequestException('No param is found in request');

      return this.messageService.find({
        where: [{ message: Like(`%${message}%`) }],
      });
    } catch (error) {
      this.logger.error((error as Error).message);
    }
  }
}
