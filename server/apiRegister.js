import users from "./api/users.js";
import login from "./api/login.js";
import logout from "./api/logout.js";
import signup from "./api/signup.js";
import products from "./api/products.js";

export default function (server, db) {
  users(server, db);
  login(server, db);
  logout(server, db);
}
