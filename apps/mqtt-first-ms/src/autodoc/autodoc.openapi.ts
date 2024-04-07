import { SendMessageResponse } from '../dto';

export const API_SENDER_CONTROLLER = {
  apiTags: 'MQTT Sender',
  500: true,
};

export const SEND_MESSAGE = {
  apiOperation: 'Send message via MQTT',
  200: { description: 'Request successful', type: SendMessageResponse },
};
