# Cypres Automation using Typrscript 

This repository contains an assignment to test Cypress skills with the Easygenerator Test Automation team. The project includes scripts to run a local server and execute Cypress tests in both headless and open modes.

## Project Information

- **Project Name**: cypress-easygenerator
- **Version**: 1.0.0
- **Description**: Testing my Cypress skills with Easygenerator Test Automation team
- **Author**: Sathishkumar Periyasamy


## Installation

To set up the project, follow these steps:

1. Clone the repository:
    ```bash
    git clone https://github.com/Sagthishvasu08/cypress-easygenerator.git
    ```

2. Install the dependencies:
    ```bash
    npm install
    ```

## Scripts

The project includes several npm scripts to facilitate various tasks:

- **Start Server**: This script launches a local HTTP server and opens `task.html`.
    ```bash
    npm run start-server
    ```

- **Cypress Open**: This script opens the Cypress Test Runner in interactive mode.
    ```bash
    npm run cypress:open
    ```

- **Cypress Run**: This script runs Cypress tests in headless mode.
    ```bash
    npm run cypress:run
    ```

## Usage

### Launching `task.html` Locally

To view and test the `task.html` file locally, use the following command:
```bash
npm run start-server

