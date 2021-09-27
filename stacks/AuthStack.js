import * as sst from "@serverless-stack/resources";

export default class AuthStack extends sst.Stack {
  auth;

  constructor(scope, id, props) {
    super(scope, id, props);

    const { appointmentsApi, studentsApi } = props;

    this.auth = new sst.Auth(this, "Auth", {
      cognito: {
        userPool: {
          signInAliases: { email: true },
        },
      },
    });

    this.auth.attachPermissionsForAuthUsers([
      appointmentsApi,
      studentsApi
    ]);

    this.addOutputs({
      Region: scope.region,
      UserPoolId: this.auth.cognitoUserPool.userPoolId,
      IdentityPoolId: this.auth.cognitoCfnIdentityPool.ref,
      UserPoolClientId: this.auth.cognitoUserPoolClient.userPoolClientId,
    });
  }
}
