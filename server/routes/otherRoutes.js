const express = require("express");
const datas = require("../datas/test_conversations");
const router = express.Router();

router.get("/conversations", (req, res) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader.split(" ")[1];

  res.json(datas);
});

module.exports = router;
