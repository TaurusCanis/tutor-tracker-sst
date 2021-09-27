import StorageStack from "./StorageStack";
import AppointmentsApiStack from "./AppointmentsApiStack";
import StudentsApiStack from "./StudentsApiStack";
import AuthStack from "./AuthStack";

export default function main(app) {

  const storageStack = new StorageStack(app, "storage");

  const appointmentsApiStack = new AppointmentsApiStack(app, "appointmentsApi", {
    table: storageStack.appointmentsTable,
  });

  const studentsApiStack = new StudentsApiStack(app, "studentsApi", {
    table: storageStack.studentsTable,
  });

  new AuthStack(app, "auth", {
    appointmentsApi: appointmentsApiStack.api,
    studentsApi: studentsApiStack.api,
  });

}
