import { Router } from "express";
import path from "path";
import protect from "../middlewares/auth";

const routes = Router();

const publicApiNames = require("fs")
  .readdirSync(__dirname + "/public", { withFileTypes: true })
  .filter((dirent) => dirent.isDirectory())
  .map((item) => item.name);

const privateApiNames = require("fs")
  .readdirSync(__dirname + "/private", { withFileTypes: true })
  .filter((dirent) => dirent.isDirectory())
  .map((item) => item.name);

publicApiNames.forEach(async (item) => {
  var route = await require(path.join(__dirname + "/public", item));
  routes.use(`/${item}/`, route);
});

privateApiNames.forEach(async (item) => {
  var route = await require(path.join(__dirname + "/private", item));
  // Need to add auth middleware
  routes.use(`/${item}/`, protect, route);
});

export default routes;
