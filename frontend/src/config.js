const config = {
  apiGateway: {
    REGION: process.env.REACT_APP_REGION,
    APPOINTMENTS_URL: process.env.REACT_APP_APPOINTMENTS_API_URL,
    STUDENTS_URL: process.env.REACT_APP_STUDENTS_API_URL,
    PARENTS_URL: process.env.REACT_APP_PARENTS_API_URL,
  },
  cognito: {
    REGION: process.env.REACT_APP_REGION,
    USER_POOL_ID: process.env.REACT_APP_USER_POOL_ID,
    APP_CLIENT_ID: process.env.REACT_APP_USER_POOL_CLIENT_ID,
    IDENTITY_POOL_ID: process.env.REACT_APP_IDENTITY_POOL_ID,
  },
}

export default config;
