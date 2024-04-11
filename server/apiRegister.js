import users from "./api/users.js";

export default function (server, db) {
  users(server, db);
}
