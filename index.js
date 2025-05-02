const { Client, GatewayIntentBits } = require("discord.js");
const mongoose = require("mongoose");
const URL = require("./model/url");
const shortid = require("shortid");

//mongodb connection
mongoose
  .connect("mongodb://127.0.0.1:27017/url-shortner-frombot")
  .then(() => console.log("connected to mongoDB successfullyy"))
  .catch((error) => console.log("connection error", error));

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.on("messageCreate", async (message) => {
  if(message.content === 'hi' || message.content === 'hello'){
  await message.reply({
    content: "Hi whatsapp!!",
  });
}
});


client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;
  if (interaction.commandName === "create") {
    const url = interaction.options.getString('url')
    if(!url){
      interaction.reply({
        content:"url is not provided"
      })
    }

    

    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      return await  interaction.reply({
        content: "please provide a valid url",
      });
    }
    try {
      const shortId = shortid.generate();

      const newEntry = new URL({
        shortId,
        redirectUrl: url,
      });

      await newEntry.save();

      await interaction.reply(
        `Short ID for your URL: http://localhost:3001/${shortId}`
      );
    } catch (error) {
      return await interaction.reply("Failed to create short URL. Please try again.");
    }
  }
});
  client.login(
    "Enter_Your_Discord_Token"
  );

