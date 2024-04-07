import config from 'config';
import { IMicroservicesConfig } from './interfaces';

export const MicroservicesConfig =
  config.get<IMicroservicesConfig>('microservices');
