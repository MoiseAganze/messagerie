const express = require("express");
const datas = require("../datas/test_conversations");
const {
  loadConversations,
  getMessages,
  markMessagesAsRead,
  sendMessage,
} = require("../actions/conversationsActions");
const jwt = require("jsonwebtoken");
const router = express.Router();

const get_token_datas = (req) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader.split(" ")[1];
  const datas = jwt.verify(token, process.env.secret_jwt);
  return datas;
};
router.get("/conversations", async (req, res) => {
  const userdatas = get_token_datas(req);
  const result = await loadConversations(userdatas.id);
  res.status(200).json(result);
});
router.get("/messages/:id", async (req, res) => {
  const userdatas = get_token_datas(req);
  const conversationId = req.params.id;
  await markMessagesAsRead(conversationId, userdatas.id);
  const messages = await getMessages(conversationId, userdatas.id);
  if (!messages || messages.length == 0) {
    return res.status(400).json([]);
  }

  return res.status(200).json(messages);
});

module.exports = router;
