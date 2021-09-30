import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from 'react-router-dom';
import config from "./config";
import { Amplify } from 'aws-amplify';

Amplify.configure({
  Auth: {
    mandatorySignIn: true,
    region: config.cognito.REGION,
    userPoolId: config.cognito.USER_POOL_ID,
    identityPoolId: config.cognito.IDENTITY_POOL_ID,
    userPoolWebClientId: config.cognito.APP_CLIENT_ID
  },
  API: {
    endpoints: [
      {
        name: "appointments",
        endpoint: config.apiGateway.APPOINTMENTS_URL,
        region: config.apiGateway.REGION,
      },
      {
        name: "students",
        endpoint: config.apiGateway.STUDENTS_URL,
        region: config.apiGateway.REGION,
      },
      {
        name: "parents",
        endpoint: config.apiGateway.PARENTS_URL,
        region: config.apiGateway.REGION,
      },
    ]
  },
});

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
