import config from 'config';
import { ITopicsConfig } from './interfaces';

export const TopicsConfig =
  config.get<ITopicsConfig>('topics');
