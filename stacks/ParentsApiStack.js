import * as sst from "@serverless-stack/resources";

export default class ParentsApiStack extends sst.Stack {
  api;

  constructor(scope, id, props) {
    super(scope, id, props);

    const { table } = props;

    this.api = new sst.Api(this, "Api", {
      defaultAuthorizationType: "AWS_IAM",
      defaultFunctionProps: {
        environment: {
          TABLE_NAME: table.tableName,
        },
      },
      routes: {
        "POST   /students": "src/parents/create.main",
        "GET    /students/{id}": "src/parents/get.main",
        "GET    /students": "src/parents/list.main",
        "PUT    /students/{id}": "src/parents/update.main",
        "DELETE /students/{id}": "src/parents/delete.main",
      },
    });

    this.api.attachPermissions([table]);

    this.addOutputs({
      ApiEndpoint: this.api.url,
    });
  }
}
