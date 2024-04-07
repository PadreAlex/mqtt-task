import { Module } from '@nestjs/common';
import { AppController } from './mqtt.controller';
import { MqttService } from './mqtt.service';
import { Bootstrappable } from '@app/bootstrap';
import { MqttModule } from '@app/mqtt';
import { PgModule } from '@app/pg';
import { TypeOrmModule } from '@nestjs/typeorm';
import { postgresConfiguration } from '@app/configuration';

@Bootstrappable('mqttListener')
@Module({
  imports: [
    MqttModule.forRoot({}),
    TypeOrmModule.forRoot(postgresConfiguration),
    PgModule,
  ],
  controllers: [AppController],
  providers: [MqttService],
})
export class MqttMSModule {}
