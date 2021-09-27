import * as sst from "@serverless-stack/resources";

export default class StudentsApiStack extends sst.Stack {
  api;

  constructor(scope, id, props) {
    super(scope, id, props);

    console.log("STUDENTS API");

    const { table } = props;

    this.api = new sst.Api(this, "Api", {
      defaultAuthorizationType: "AWS_IAM",
      defaultFunctionProps: {
        environment: {
          TABLE_NAME: table.tableName,
        },
      },
      routes: {
        "POST   /students": "src/students/create.main",
        "GET    /students/{id}": "src/students/get.main",
        "GET    /students": "src/students/list.main",
        "PUT    /students/{id}": "src/students/update.main",
        "DELETE /students/{id}": "src/students/delete.main",
      },
    });

    this.api.attachPermissions([table]);

    this.addOutputs({
      ApiEndpoint: this.api.url,
    });
  }
}
