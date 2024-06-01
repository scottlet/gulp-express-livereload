import notifier from 'node-notifier';
import { join } from 'path';

/**
 * @param {string} a array or string
 * @returns {string};
 */
function short(a) {
  if (Array.isArray(a)) {
    const arr = a.split('/');

    return arr[arr.length - 1];
  }

  return a;
}

/**
 * @typedef {import('node-notifier').NotificationCallback} ErrorHandlerFunction
 * @typedef {import('http-errors').HttpError} HttpError
 */

/**
 * Creates a notification sender function based on the given type.
 * @param {string} type - The type of the notification.
 * @returns {function(HttpError): boolean} A function that sends a notification with the given type and error details
 */
function sendNotificationFactory(type) {
  /**
   * @param {HttpError} error error object
   * @returns {boolean}
   */

  return function sendNotification(error) {
    if (error.stack) {
      console.error(error.stack);
    }

    notifier.notify({
      icon: join(__dirname, '/img/alert.png'),
      contentImage: join(__dirname, '/img/alert.png'),
      title: 'WP Theme Builder',
      subtitle: type,
      message: `${short(error.fileName)}: ${error.lineNumber}, ${error.message}`,
      sound: true,
      timeout: 15
    });

    return true;
  };
}

export { sendNotificationFactory as notify };
