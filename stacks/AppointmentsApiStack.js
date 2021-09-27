import * as sst from "@serverless-stack/resources";

export default class AppointmentsApiStack extends sst.Stack {
  api;

  constructor(scope, id, props) {
    super(scope, id, props);

    const { table } = props;

    console.log("APPOINTMENTS API");

    this.api = new sst.Api(this, "Api", {
      defaultAuthorizationType: "AWS_IAM",
      defaultFunctionProps: {
        environment: {
          TABLE_NAME: table.tableName,
        },
      },
      routes: {
        "POST   /appointments": "src/appointments/create.main",
        "GET    /appointments/{id}": "src/appointments/get.main",
        "GET    /appointments": "src/appointments/list.main",
        "PUT    /appointments/{id}": "src/appointments/update.main",
        "DELETE /appointments/{id}": "src/appointments/delete.main",
      },
    });

    this.api.attachPermissions([table]);

    this.addOutputs({
      ApiEndpoint: this.api.url,
    });
  }
}
