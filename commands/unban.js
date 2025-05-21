const { EmbedBuilder, PermissionsBitField } = require("discord.js");

exports.run = async (client, message, args) => {
    const logChannelId = '1295861196313854024'; // Replace with your channel ID
    const userId = args[0];

    if (!message.member.permissions.has(PermissionsBitField.Flags.BanMembers)) {
        return message.reply({
            embeds: [
                new EmbedBuilder()
                    .setColor("#FF0000")
                    .setDescription("> <a:Cross:1295862782679453782> **aww. You're not Management. hehe.**")
            ]
        });
    }

    if (!message.guild.members.me.permissions.has(PermissionsBitField.Flags.BanMembers)) {
        return message.reply({
            embeds: [
                new EmbedBuilder()
                    .setColor("#FF0000")
                    .setDescription("> <a:Cross:1295862782679453782> **I don't have permission to unban members.**")
            ]
        });
    }

    if (!userId) {
        return message.reply({
            embeds: [
                new EmbedBuilder()
                    .setColor("#FFFF00")
                    .setDescription("> <:Alert:1295861176957407296> **Please provide a valid user ID to unban.**")
            ]
        });
    }

    try {
        const user = await client.users.fetch(userId);
        await message.guild.members.unban(userId);

        const unbanEmbed = new EmbedBuilder()
            .setColor("#00FF00")
            .setDescription(`<:verified:1295861975821189183> **${user.tag} has been unbanned.**`)
            .setTimestamp();

        message.reply({ embeds: [unbanEmbed] });

        const logEmbed = new EmbedBuilder()
            .setColor("#007FFF")
            .setDescription(`
                <:tutuMod:1267939618322518059> **Member unbanned**
                > <:dot:1295863042919239740> **User Unbanned : ${user.tag} (${userId})**
                > <:dot:1295863042919239740> **Moderator : ${message.author.tag} (${message.author.id})**
            `)
            .setTimestamp()
            .setFooter({
                text: `ID: ${userId}`,
                iconURL: user.displayAvatarURL({ dynamic: true })
            });

        const logChannel = await client.channels.fetch(logChannelId);
        if (logChannel) {
            logChannel.send({ embeds: [logEmbed] });
        }
    } catch (error) {
        message.reply({
            embeds: [
                new EmbedBuilder()
                    .setColor("#FF0000")
                    .setDescription("<a:Cross:1295862782679453782> An error occurred while trying to unban the user.")
            ]
        });
        console.error(error);
    }
};

exports.conf = {
    aliases: ["pardon", "forgive"]
};

exports.help = {
    name: "unban"
};
