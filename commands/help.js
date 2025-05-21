const { EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

exports.run = async (client, message, args) => {
 
  // Category Embeds
  const categoryEmbeds = {
    music: new EmbedBuilder()
      .setDescription(`<:tutuSearch:1267939169934508042> **Resources**\nal syllabus, mf19, transtestnh3, transtestnaoh, bond angles, estimation1, estimation2, physics formulae, projectile motion equations, graphing calculator, studyhaven, organic mindmap, prerequisitesfm`)
      .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
      .setFooter({ text: `Requested by ${message.author.displayName}`, iconURL: message.author.displayAvatarURL({ dynamic: true }) }),

    filter: new EmbedBuilder()
      .setDescription('<:Alert:1295861176957407296> **Information**\n\n> <:dot:1295863042919239740> `avatar`, `about`, `help`, `pay`, `ticket`')
      .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
      .setFooter({ text: `Requested by ${message.author.displayName}`, iconURL: message.author.displayAvatarURL({ dynamic: true }) }),

    information: new EmbedBuilder()
      .setDescription(`<:tutuSearch:1267939169934508042> **Achievements Command [\`(Coming Soon)\`](https://discord.gg/snoww)**\n\n**__-profile__**\nWith the help of this command you can view your achievements of the server.\n> <:dot:1295863042919239740> **Alias :** \`-pr\` | \`-Badges\``)
      .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
      .setFooter({ text: `Requested by ${message.author.displayName}`, iconURL: message.author.displayAvatarURL({ dynamic: true }) }),
  };

  const embed = new EmbedBuilder()
    .setAuthor({ name: `Help Menu`, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
    .setDescription("<:bearcycle:1295867761159045200> Official Bot of **O/A Level Community** For Management.\n <:tutuPrefix:1267939215375601705> Prefix For This Server : `!`\n <:dot:1295863042919239740> Use The Menu Below And help yourself.\n\n<:cs_lists:1279116455572668461> **__Categories__**\n<:tutuSearch:1267939169934508042> Resources\n<:Alert:1295861176957407296> Information\n<:tutuLeaderboard:1267940107122376806> Achievements")
    .setColor("#007fff")
    //.setImage("https://cdn.discordapp.com/banners/1279054089119862794/a_25ce2952a9ce1e646719f696c1ee57aa.gif?size=4096")
    .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
    .setTimestamp()
    .setFooter({ text: `Requested By ${message.member.displayName}`, iconURL: message.author.displayAvatarURL({ dynamic: true }) });

  // Select Menu for Command Categories
  let menu = new StringSelectMenuBuilder()
    .setCustomId("menu")
    .setMinValues(1)
    .setMaxValues(1)
    .setPlaceholder("Browse Commands")
    .addOptions([
      {
        label: "Resources",
        value: "music",
        emoji: `<:tutuSearch:1267939169934508042>`,
      },
      {
        label: "Information",
        value: "filter",
        emoji: `<:Alert:1295861176957407296>`,
      },
      {
        label: "Achievements",
        value: "information",
        emoji: `<:tutuLeaderboard:1267940107122376806>`,
      },
    ]);

    const selectMenu = new ActionRowBuilder().addComponents(menu);

    // Back Button
    const backButton = new ButtonBuilder()
      .setCustomId("back")
      .setEmoji("<:gettobackarrow:1277402385400205362>")
      .setStyle(ButtonStyle.Success);
  
    // Send Initial Message
    const m = await message.reply({
      embeds: [embed],
      components: [selectMenu],
    });
  
    // Filter for Interactions
    const filter = async (interaction) => {
      if (interaction.user.id === message.author.id) {
        return true;
      }
      await interaction.reply({
        embeds: [
          new EmbedBuilder().setDescription(
            `⛔ Only **${message.author.tag}** can use this.`
          ),
        ],
        ephemeral: true,
      });
      return false;
    };
  
    const collector = m.createMessageComponentCollector({
      filter: filter,
      time: 300000, // 5 minutes timeout
    });
  
    collector.on("collect", async (interaction) => {
      if (!interaction.deferred) await interaction.deferUpdate();
  
      const category = interaction.values?.[0] || interaction.customId;
      let newEmbed;
      let components = [];
  
      switch (category) {
        case "home":
          newEmbed = embed;
          components = [selectMenu];
          break;
  
        case "all":
          newEmbed = categoryEmbeds.all;
          components = [new ActionRowBuilder().addComponents(backButton)];
          break;
  
        case "back":
          newEmbed = embed;
          components = [selectMenu];
          break;
  
        default:
          newEmbed = categoryEmbeds[category] || embed;
          components = [new ActionRowBuilder().addComponents(backButton)];
          break;
      }
  
      await m.edit({
        embeds: [newEmbed],
        components: components,
      }).catch(() => {});
    });
  
    collector.on("end", async () => {
      await m.edit({ components: [] }).catch(() => {});
    });
};

exports.conf = {
  aliases: ["h"],
};

exports.help = {
  name: "help",
};
