import { SendMessageResponse } from '../dto';

export const API_SENDER_CONTROLLER = {
  apiTags: 'MQTT Sender',
  500: false,
};

export const SEND_MESSAGE = {
  apiOperation: 'Send message via MQTT',
  200: { description: 'Request successful', type: SendMessageResponse },
  400: 'No message was found in request',
  409: 'Message is not string type'
};
