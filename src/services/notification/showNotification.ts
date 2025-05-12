import UIkit from 'uikit';

export const showNotification = (message: string, status: string): void => {
  UIkit.notification({
    message: message,
    status: status,
    pos: 'top-right',
    timeout: 2500,
  });
};
