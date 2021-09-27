import * as sst from "@serverless-stack/resources";

export default class StorageStack extends sst.Stack {

  appointmentsTable;
  studentsTable;

  constructor(scope, id, props) {
    super(scope, id, props);

    this.appointmentsTable = new sst.Table(this, "Appointments", {
      fields: {
        userId: sst.TableFieldType.STRING,
        appointmentId: sst.TableFieldType.STRING,
      },
      primaryIndex: { partitionKey: "userId", sortKey: "appointmentId" },
    });

    this.studentsTable = new sst.Table(this, "Students", {
      fields: {
        userId: sst.TableFieldType.STRING,
        studentId: sst.TableFieldType.STRING,
      },
      primaryIndex: { partitionKey: "userId", sortKey: "studentId" },
    });

  }
}
