import StorageStack from "./StorageStack";
import AppointmentsApiStack from "./AppointmentsApiStack";
import StudentsApiStack from "./StudentsApiStack";
import AuthStack from "./AuthStack";
import FrontendStack from "./FrontendStack";

export default function main(app) {

  const storageStack = new StorageStack(app, "storage");

  const appointmentsApiStack = new AppointmentsApiStack(app, "appointmentsApi", {
    table: storageStack.appointmentsTable,
  });

  const studentsApiStack = new StudentsApiStack(app, "studentsApi", {
    table: storageStack.studentsTable,
  });

  const authStack = new AuthStack(app, "auth", {
    appointmentsApi: appointmentsApiStack.api,
    studentsApi: studentsApiStack.api,
  });

  new FrontendStack(app, "frontend", {
    appointmentsApi: appointmentsApiStack.api,
    studentsApi: studentsApiStack.api,
    auth: authStack.auth,
  });

}
