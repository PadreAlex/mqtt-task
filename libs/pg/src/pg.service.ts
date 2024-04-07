import { MessageEntity } from '@app/entities';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';

@Injectable()
export class PgService {
  constructor(
    @InjectRepository(MessageEntity)
    private repository: Repository<MessageEntity>,
  ) {}

  /**
   * find all messages that, pass whatever params you need
   * @param {FindManyOptions} options - typeorm query. Like - {where: {id: "123"}}
   */
  async find(
    options: FindManyOptions<MessageEntity>,
  ): Promise<MessageEntity[]> {
    return this.repository.find(options);
  }

  /**
   * save string in DB
   * @param {string} data - in our case it`s a message
   */
  async save(data: string): Promise<MessageEntity> {
    let newData = new MessageEntity();
    newData.message = data;
    return this.repository.save(newData);
  }
}
