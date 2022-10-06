import express from "express";

import { CreateUser } from "../../../controllers/demo";

const router = express.Router();

router.post("/", async (req, res, next) => {
  try {
    let data = CreateUser(req.body);
    res.status(200).send({ type: "success", data });
  } catch (err) {
    console.log(err);
    next({
      code: 500,
      message: err,
    });
  }
});

module.exports = router;
