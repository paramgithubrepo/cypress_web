import { defineConfig } from 'cypress';
const webpack = require('@cypress/webpack-preprocessor');
const fs = require('fs');
const path = require('path');

// Function to read environment variables from cypress.env.json
function getEnvConfig() {
  const configPath = path.resolve(__dirname, 'cypress.env.json');
  if (!fs.existsSync(configPath)) {
    throw new Error(`Configuration file not found: ${configPath}`);
  }
  return JSON.parse(fs.readFileSync(configPath, 'utf-8'));
}

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      const options = {
        webpackOptions: {
          resolve: {
            extensions: ['.ts', '.js'],
            alias: {
              '@pages': path.resolve(__dirname, 'cypress/support/pages')
            }
          },
          module: {
            rules: [
              {
                test: /\.ts$/,
                exclude: [/node_modules/],
                use: [
                  {
                    loader: 'ts-loader',
                  },
                ],
              },
            ],
          },
        },
      };
      on('file:preprocessor', webpack(options));

      // Define the task to read alert-text.txt file
      on('task', {
        readAlertText() {
          const filePath = path.resolve(__dirname, 'alert-text.txt');
          return new Promise((resolve, reject) => {
            fs.readFile(filePath, 'utf8', (err, data) => {
              if (err) {
                return reject(err);
              }
              resolve(data);
            });
          });
        }
      });

      // Access environment variables from cypress.env.json
      try {
        const envConfig = getEnvConfig();
        
        // Determine the environment from a custom environment variable
        const environment = config.env.environment || 'qa';
        
        // Set the base URL and API URL based on the environment
        if (environment === 'qa') {
          config.baseUrl = envConfig.qa_url;
          config.env.apiUrl = envConfig.qa_api;
        } else if (environment === 'uat') {
          config.baseUrl = envConfig.uat_url;
          config.env.apiUrl = envConfig.uat_api;
        }
        
      } catch (error) {
        console.error(error.message);
        throw error;
      }

      return config;
    },
    specPattern: 'cypress/e2e/*.cy.{js,jsx,ts,tsx}',
    defaultCommandTimeout: 8000,
    pageLoadTimeout: 60000,
    viewportWidth: 1280,
    viewportHeight: 720,
    video: true,
    screenshotOnRunFailure: true,
    chromeWebSecurity: false
  },
});
