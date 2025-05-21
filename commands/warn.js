const { EmbedBuilder, PermissionsBitField } = require("discord.js");

exports.run = async (client, message, args) => {
    const logChannelId = '1295861196313854024'; // Replace with your channel ID
    const member = message.mentions.members.first();
    const reason = args.slice(1).join(' ') || "No reason provided";

    if (!message.member.permissions.has(PermissionsBitField.Flags.ModerateMembers)) {
        return message.reply({
            embeds: [
                new EmbedBuilder()
                    .setColor("#FF0000")
                    .setDescription("> <a:Cross:1295862782679453782> **You do not have permission to warn members.**")
            ]
        });
    }

    if (!member) {
        return message.reply({
            embeds: [
                new EmbedBuilder()
                    .setColor("#FFFF00")
                    .setDescription("> <:Alert:1295861176957407296> **Please mention a user to warn.**")
            ]
        });
    }

    try {
        // Log the warning (you may also want to save this in a database)
        const logEmbed = new EmbedBuilder()
            .setColor("#FFA500")
            .setDescription(`
                <:tutuMod:1267939618322518059> **Member warned**
                > <:dot:1295863042919239740> **User Warned: ${member.user.tag} (${member.id})**
                > <:dot:1295863042919239740> **Moderator: ${message.author.tag} (${message.author.id})**
                > <:dot:1295863042919239740> **Reason: ${reason}**
            `)
            .setFooter({
                text: `ID: ${member.id}`,
                iconURL: member.user.displayAvatarURL({ dynamic: true })
            });

        const logChannel = await client.channels.fetch(logChannelId);
        if (logChannel) {
            logChannel.send({ embeds: [logEmbed] });
        }

        const warnEmbed = new EmbedBuilder()
            .setColor("#00FF00")
            .setDescription(`<:verified:1295861975821189183> **${member.user.tag} has been warned. | Reason: ${reason}**`);

        message.reply({ embeds: [warnEmbed] });
    } catch (error) {
        message.reply({
            embeds: [
                new EmbedBuilder()
                    .setColor("#FF0000")
                    .setDescription("<a:Cross:1295862782679453782> An error occurred while trying to warn the user.")
            ]
        });
        console.error(error);
    }
};

exports.conf = {
    aliases: ["warning", "warnuser"]
};

exports.help = {
    name: "warn"
};
