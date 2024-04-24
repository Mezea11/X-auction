import users from "./api/users.js";
import login from "./api/login.js";
import logout from "./api/logout.js";
import products from "./api/products.js";
import signup from "./api/signup.js";
import editUser from "./api/editUser.js";

export default function (server, db) {
  users(server, db);
  login(server, db);
  logout(server, db);
  products(server, db);
  signup(server, db);
  editUser(server, db);
}
