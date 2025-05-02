const { REST, Routes } = require("discord.js");

const commands = [
  {
    name: "create",
    description: "Generated short Url",
    options:[
    {
      name:"url",
      type:3,//3=string
      description: "The URL to shorten",  // THIS WAS MISSING
      required:true,
    },
  ],
},
];

const rest = new REST({ version: "10" }).setToken(
  "Enter_Your_Discord_Token"
);

(async () => {
  try {
    console.log("Started refreshing application (/) commands.");

    await rest.put(Routes.applicationCommands("1366305455911079987"), {
      body: commands,
    });

    console.log("Successfully reloaded application (/) commands.");
  } catch (error) {
    console.log(error);
  }
})();
