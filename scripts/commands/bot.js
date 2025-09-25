const axios = require("axios");

const BOT_REPLIES = [
  "আমি এখন জয় বস এর সাথে বিজি আছি",
  "what are you asking me to do?",
  "I love you baby meye hole chipay aso",
  "Love you 3000-😍💋💝",
  "ji bolen ki korte pari ami apnar jonno?",
  "আমাকে না ডেকে আমার বস জয়কে ডাকেন! link: https://www.facebook.com/100001435123762",
  "Hmm jan ummah😘😘",
  "তুমি কি আমাকে ডাকলে বন্ধু 🤖?",
  "ভালোবাসি তোমাকে 🤖",
  "Hi, 🤖 i can help you~~~~"
];

const TRIGGERS = ["bot", "বট", "bby"];

module.exports.config = {
  name: "bot",
  version: "3.3.0",
  permission: 0,
  credits: "JOY",
  description: "Trigger bot + API reply + reply-to-bot messages",
  prefix: false,
  category: "chat",
  usages: "[bot/bট/bby / question]",
  cooldowns: 2,
};

module.exports.handleReply = async function({ api, event, handleReply }) {
  try {
    const { threadID, messageID, body } = event;
    const text = body.trim();

    const API_CONFIG_URL = "https://raw.githubusercontent.com/JUBAED-AHMED-JOY/Joy/main/api.json";
    const configRes = await axios.get(API_CONFIG_URL);
    const API_BASE = configRes.data.api;

    const res = await axios.get(`${API_BASE}/sim?text=${encodeURIComponent(text)}`);
    const answer = res.data.answer || "😶 Bot কিছু বলতে পারলো না";

    const sentMsg = await api.sendMessage(answer, threadID, messageID);
    global.client.handleReply.push({
      type: "reply",
      name: this.config.name,
      author: event.senderID,
      messageID: sentMsg.messageID
    });
  } catch (e) {
    console.error(e);
    return api.sendMessage("❌ API error: " + e.message, event.threadID, event.messageID);
  }
};

module.exports.run = async function({ api, event }) {
  const { threadID, messageID, body } = event;
  if (!body) return;

  const text = body.trim();
  const lowerText = text.toLowerCase();

  try {
    
    if (TRIGGERS.includes(lowerText)) {
      const randomReply = BOT_REPLIES[Math.floor(Math.random() * BOT_REPLIES.length)];
      const sentMsg = await api.sendMessage(randomReply, threadID, messageID);
      global.client.handleReply.push({
        type: "reply",
        name: this.config.name,
        author: event.senderID,
        messageID: sentMsg.messageID
      });
      return;
    }

    
    const API_CONFIG_URL = "https://raw.githubusercontent.com/JUBAED-AHMED-JOY/Joy/main/api.json";
    const configRes = await axios.get(API_CONFIG_URL);
    const API_BASE = configRes.data.api;

    const res = await axios.get(`${API_BASE}/sim?text=${encodeURIComponent(text)}`);
    const answer = res.data.answer || "😶 Bot কিছু বলতে পারলো না";

    const sentMsg = await api.sendMessage(answer, threadID, messageID);
    global.client.handleReply.push({
      type: "reply",
      name: this.config.name,
      author: event.senderID,
      messageID: sentMsg.messageID
    });

  } catch (e) {
    console.error(e);
    return api.sendMessage("❌ API error: " + e.message, threadID, messageID);
  }
};
