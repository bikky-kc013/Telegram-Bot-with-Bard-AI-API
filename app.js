import express from "express";
import dotenv from "dotenv";
import telegramBot from "node-telegram-bot-api"; // install this npm package to create the telegram bot 
import bard from "bard-ai";  //you have to install this npm package in order to use this application i.e npm i bard-ai
const app = express();
app.use(express.json());
dotenv.config();



// You can get the cookies from your bard just inspect the page and there you have to go to the application and down on the left hand side you can see cookies and from there copy  the 
// tokens and initialize below 
const bardtoken = new bard({
  "__Secure-1PSID": process.env.API,
 // "__Secure-1PSIDTS": process.env.PSIDTS,
});



// this is for creating the telegram bot 
const bot = new telegramBot(process.env.ACCESS_TOKEN, { polling: true }); // set the polling to true 
bot.on("message", async (message) => {   // this should be async function as bard will take some time to answer your query 
  const userId = message.chat.id;     // get the bot id 
  const querytoAi = message.text;      //get the query as the text that has been asked by the user
  const replyToUser = await bardtoken.ask(querytoAi); 
  bot.sendMessage(userId, replyToUser);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, "127.0.0.1", () => {
  console.log(`Listening to the Port ${PORT}`);
});
