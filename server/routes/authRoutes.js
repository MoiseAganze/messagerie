const express = require("express");
const router = express.Router();

router.post("/register", (req, res) => {
  const datas = req.body;
  console.log(datas);
  res.json(datas);
});

module.exports = router;
