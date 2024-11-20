import { readFileSync } from 'fs';
import { resolve } from 'path';

export default (on: Cypress.PluginEvents, config: Cypress.PluginConfigOptions) => {
  on('task', {
    readAlertText() {
      const filePath = resolve(__dirname, '..', '..', 'alert-text.txt');
      return new Promise((resolve, reject) => {
        try {
          const data = readFileSync(filePath, 'utf8');
          resolve(data);
        } catch (err) {
          reject(err);
        }
      });
    }
  });
  return config;
};
