const { EmbedBuilder } = require("discord.js");
var config = require("../config.js");
const client = require("..");
const prefix = config.prefix;

client.on("messageCreate", async (message) => {
  if (!message.guild) return;
  if (message.author.bot) return;

  if (message.content.trim() === "<@1295841133288488994>") {
    const embed = new EmbedBuilder()
      .setDescription(`> <:tutuWarn:1267939299983364227> **Prefix For Commands :** \`!\``);

    return message.channel.send({ embeds: [embed] });
  } 

  

  if (!message.content.startsWith(prefix)) return;
  let command = message.content.toLocaleLowerCase().split(" ")[0].slice(prefix.length);
  let params = message.content.split(" ").slice(1);
  let cmd;
  if (client.commands.has(command)) {
    cmd = client.commands.get(command);
  } else if (client.aliases.has(command)) {
    cmd = client.commands.get(client.aliases.get(command));
  }
  if (cmd) {
    cmd.run(client, message, params);
  }
});
