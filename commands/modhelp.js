const { EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

exports.run = async (client, message, args) => {
 
  // Category Embeds
const categoryEmbeds = {
  music: new EmbedBuilder()
    .setDescription(`<:tutuSearch:1267939169934508042> **Resources**
al syllabus, mf19, transtestnh3, transtestnaoh, bond angles, estimation1, estimation2, physics formulae, projectile motion equations       , graphing calculator, studyhaven, organic mindmap, prerequisitesfm`)
    .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
    .setFooter({ text: `Requested by ${message.author.displayName}`, iconURL: message.author.displayAvatarURL({ dynamic: true }) }),

  config: new EmbedBuilder()
    .setDescription('<:tutuMod:1267939618322518059> **Moderation**\n\n> <:dot:1295863042919239740> `ban`, `unban`, `kick`, `mute`, `unmute`, `nuke`, `purge`, `steal`, `rolemenu`')
    .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
    .setFooter({ text: `Requested by ${message.author.displayName}`, iconURL: message.author.displayAvatarURL({ dynamic: true }) }),

  filter: new EmbedBuilder()
    .setDescription('<:Alert:1295861176957407296> **Information**\n\n> <:dot:1295863042919239740> `avatar`, `about`, `help`, `pay`, `ticket`')
    .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
    .setFooter({ text: `Requested by ${message.author.displayName}`, iconURL: message.author.displayAvatarURL({ dynamic: true }) }),

  information: new EmbedBuilder()
    .setDescription(`<:tutuSearch:1267939169934508042> **Achivements Command**

**__-profile__**
With the help of this command you can view your achievements of the server.
> <:dot:1295863042919239740> **Alias :** \`-pr\` | \`-Badges\``)
    .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
    .setFooter({ text: `Requested by ${message.author.displayName}`, iconURL: message.author.displayAvatarURL({ dynamic: true }) }),
  
  all: new EmbedBuilder()
    .setDescription(`🎵 **Music Commands**\n> \`autoplay\`, \`clear\`, \`grab\`, \`join\`, \`leave\`, \`loop\`, \`nowplaying\`, \`pause\`, \`play\`, \`previous\`, \`queue\`, \`radio\`, \`rejoin\`, \`remove\`, \`resume\`, \`search\`, \`seek\`, \`shuffle\`, \`similar\`, \`skip\`, \`stop\`, \`volume\`\n\n🔧 **Config Commands**\n> \`247\`, \`buy\`, \`config\`, \`ignore\`, \`prefix\`, \`premium\`, \`preset\`, \`profile\`, \`redeem\`\n\n🔍 **Filter Commands**\n> \`enhance\`, \`equalizer\`, \`filter\`, \`optimize\`\n\nℹ️ **Information Commands**\n> \`balance\`, \`help\`, \`invite\`, \`ping\`, \`report\`, \`stats\`, \`support\`, \`vote\``)
    .setFooter({ text: `Requested by ${message.author.tag}.`, iconURL: message.author.displayAvatarURL({ dynamic: true }) }),
};

  const embed = new EmbedBuilder()
  .setAuthor({ name: `Moderator Help Menu`, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
  .setDescription("<:bearcycle:1295867761159045200> Official Bot of **O/A Level Community** For Management.\n <:tutuPrefix:1267939215375601705> Prefix For This Server : `!`\n <:dot:1295863042919239740> Use The Menu Below And help yourself.\n\n<:cs_lists:1279116455572668461> **__Categories__**\n<:tutuSearch:1267939169934508042> Resources\n<:Alert:1295861176957407296> Information\n<:tutuMod:1267939618322518059> Moderation\n<:tutuLeaderboard:1267940107122376806> Achievements")
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
        label: "Moderation",
        value: "config",
        emoji: `<:tutuMod:1267939618322518059>`,
      },
      {
        label: "Information",
        value: "filter",
        emoji: `<:Alert:1295861176957407296>`,
      },
      {
        label: "Achivements",
        value: "information",
        emoji: `<:tutuLeaderboard:1267940107122376806>`,
      },
      /*{
        label: "Show all commands",
        value: "all",
        emoji: `🤖`,
      },*/
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
  aliases: ["mh"]
};

exports.help = {
  name: "modhelp"
};


