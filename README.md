# Weather Application

This is a React application that provides weather information using the SMHI API and the Positionstack API.

## Preparations

Before running the application, make sure you have the following:

- Node.js installed on your machine
- API keys for the SMHI API and the Positionstack API

## Getting Started

To get started with the application, follow these steps:

1. Clone the repository to your local machine.
2. Install the dependencies by running the following command:

   ```shell
   npm install
   ```
3. Create a .env file in the root directory of the project and add the following variables:

    ```makefile
    REACT_APP_API_KEY_POSITIONSTACK=<YOUR_POSITIONSTACK_API_KEY>
    ```
Replace <REACT_APP_API_KEY_POSITIONSTACK> with your Positionstack API key.

4. Start the application by running the following command:

    ```shell
    npm start
    ```

5. Open http://localhost:3000 in your browser to view the application.

## Available Scripts

In the project directory, you can run the following scripts:
* `npm start`: Runs the app in development mode.
* `npm run build`: Builds the app for production.

## Usage

1. On the home page, enter a city in Sweden or close to Sweden in the input field 
*(Keep in mind: It's not sure that the SMHI API will not work with cities that is to far from Sweden)*
2. Choose a city in the dropdown option menu.
3. The application will thereafter fetch the weather data from the SMHI API based on the provided coordinates.
4. If there is an error fetching the weather data, an error message will be displayed.
5. The loading indicator will be shown while the data is being fetched.
6. The weather forecast for each day will be displayed on the page.
7. The application also allows you to select a specific day to view the hourly forecast for that day.