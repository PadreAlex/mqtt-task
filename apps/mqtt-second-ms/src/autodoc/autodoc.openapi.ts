import { MessageEntity } from '@app/entities';

export const API_LISTENER_CONTROLLER = {
  apiTags: 'MQTT Listener',
  500: false,
};

export const GET_MESSAGE = {
  apiOperation: 'Gey message',
  200: { description: 'Request successful', type: [MessageEntity] },
  400: 'No param is found in request'
};
