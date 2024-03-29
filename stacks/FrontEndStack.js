import * as sst from "@serverless-stack/resources";

export default class FrontendStack extends sst.Stack {
  constructor(scope, id, props) {
    super(scope, id, props);

    const { appointmentsApi, studentsApi, parentsApi, auth } = props;

    // Define our React app
    const site = new sst.ReactStaticSite(this, "ReactSite", {
      path: "frontend",
      // Pass in our environment variables
      environment: {
        REACT_APP_STUDENTS_API_URL: studentsApi.url,
        REACT_APP_APPOINTMENTS_API_URL: appointmentsApi.url,
        REACT_APP_PARENTS_API_URL: parentsApi.url,
        REACT_APP_REGION: scope.region,
        REACT_APP_USER_POOL_ID: auth.cognitoUserPool.userPoolId,
        REACT_APP_IDENTITY_POOL_ID: auth.cognitoCfnIdentityPool.ref,
        REACT_APP_USER_POOL_CLIENT_ID:
          auth.cognitoUserPoolClient.userPoolClientId,
      },
    });

    // Show the url in the output
    this.addOutputs({
      SiteUrl: site.url,
    });
  }
}
