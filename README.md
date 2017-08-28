## Stack:
| Package | Description |
| --- | --- |
| `create-react-app` | Create React apps with no build configuration.
| `redux` | Predictable state container for JavaScript apps
| `react-router` | Routing library for React
| `redux-thunk` | An alternative side effect model for Redux apps
| `normalizr` | Normalizes nested JSON according to a schema
| `reselect` | Selector library for Redux
| `babel` | Compiler for writing next generation JavaScript

## Installation:
1. This application requires `mongodb` database. To install it, go to this [link](https://www.mongodb.com/download-center).  
2. After, you need install all dependencies using this command:
  ```
  npm install
  or
  yarn install
  ```  

3. Next, you should create config `.env` files:
  ```
  WP_URL='Place here your wordpress website link like `http://localhost:8888`'
  ``` 

5. Next, you can run application:  

  #### In development mode:
  ```
  npm start
  ```
  #### In production mode:
  ```
  npm run server
  ```
  
  ## Npm commands:
| Command | Description |
| --- | --- |
| `npm install` | Install project dependencies and build files |
| `npm start` | Run server with webpack in `development` mode |
| `npm run server` | Run server in `production` mode |
| `npm run build` | Build client javascript file for production |
| `npm test` | Run tests in watch mode |
| `npm run test-all` | Run all test files |
