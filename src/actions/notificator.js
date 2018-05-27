export const SHOW_MESSAGE = 'notificator/showMessage';
export const HIDE_MESSAGE = 'notificator/hideMessage';

export function showMessage(message) {
  return { type: SHOW_MESSAGE, payload: { message } };
}

export function hideMessage() {
  return { type: HIDE_MESSAGE };
}
