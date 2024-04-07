import { Body, Controller, Post } from '@nestjs/common';
import { MqttSenderService } from './mqtt.service';
import { SendMessageDTO } from './dto';
import { AutoDoc, AutoDocController } from '@app/autodoc';
import { API_SENDER_CONTROLLER, SEND_MESSAGE } from './autodoc';

@AutoDocController(API_SENDER_CONTROLLER)
@Controller()
export class AppController {
  constructor(private readonly appService: MqttSenderService) {}

  @AutoDoc(SEND_MESSAGE)
  @Post('/send_message')
  getHello(@Body() body: SendMessageDTO) {
    return this.appService.sendViaMQTT(body);
  }
}
