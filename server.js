import OS from "os";
import express from "express";
import routers from "./src/routers";
import { Sequelize } from "sequelize";
import config from "./db/config";

/**
 * Express Instance
 */
const app = express();

/**
 *  PORT ESTABLISHMENT AND BODY PARSING
 */

const PORT = process.env.PORT || 8080;
app.set("port", PORT);
app.use(express.json());

/**
 *  Thread pool configuration settings for  the application server.
 *
 */
process.env.UV_THREADPOOL_SIZE = OS.cpus().length;

/**
 *  HeartBeat and Process Information
 */

app.get("/", async (req, res) => {
  const status = {
    uptime: process.uptime(),
    message: "Server is running...",
    process_id: process.pid,
    dateTime: new Date(),
    platform: OS.platform(),
    processor: OS.cpus()[0].model,
    architecture: OS.arch(),
    thread_count: OS.cpus().length,
    total_memory: `${(OS.totalmem() / 1e9).toFixed(2)} GB`,
    free_memory: `${(OS.freemem() / 1e9).toFixed(2)} GB`,
  };

  res.status(200).send(status);
});

app.use("/api/v1", routers);

/**
 *  DATABASE CONNECTION CONFIGURATION
 */

app.listen(PORT, async () => {
  try {
    console.log("Server is running at port : " + PORT);
    const sequelize = new Sequelize(config[process.env.NODE_ENV]);
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
});
