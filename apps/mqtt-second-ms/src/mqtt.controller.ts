import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { MqttService } from './mqtt.service';
import { AutoDoc, AutoDocController } from '@app/autodoc';
import { API_LISTENER_CONTROLLER, GET_MESSAGE } from './autodoc';

@AutoDocController(API_LISTENER_CONTROLLER)
@Controller()
export class AppController {
  constructor(private readonly mqttService: MqttService) {}

  @AutoDoc(GET_MESSAGE)
  @Get('findMessage/:message')
  async findMessage(@Param('message') message: string) {
    return this.mqttService.findMessage(message)
  }
}
