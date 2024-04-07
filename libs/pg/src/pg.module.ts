import { MessageEntity } from '@app/entities';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PgService } from './pg.service';

@Module({
  imports: [TypeOrmModule.forFeature([MessageEntity])],
  providers: [PgService],
  exports: [PgService],
})
export class PgModule {}
