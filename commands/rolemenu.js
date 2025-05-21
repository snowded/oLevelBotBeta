const { EmbedBuilder, ActionRowBuilder, RoleSelectMenuBuilder, PermissionsBitField } = require("discord.js");

exports.run = async (client, message, args) => {
    if (!message.member.permissions.has(PermissionsBitField.Flags.ManageRoles)) {
        return message.reply({
            embeds: [
                new EmbedBuilder()
                    .setColor("#FF0000")
                    .setDescription("> <a:Cross:1295862782679453782>  **aww. You're not Management. hehe.**")
            ]
        });
    }

    const target = await message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if (!target) {
        return message.reply({
            embeds: [
                new EmbedBuilder()
                    .setColor("#FF0000")
                    .setDescription("> <a:Cross:1295862782679453782> **No user found. Please mention a user or provide a valid user ID.**")
            ]
        });
    }

    await createRoleMenu(message, target);
};

async function createRoleMenu(context, target) {
    const embed = new EmbedBuilder()
        .setAuthor({
            name: `Role Menu`,
            iconURL: `https://cdn.discordapp.com/emojis/1270055355912814592.webp?size=96&quality=lossless`
        })
        .setDescription(`<a:reddot_:1279114784112902174> **Use the role menu below to change roles for ${target}.**`)
        .setColor("#FF69B4");

    const addRoleMenu = new RoleSelectMenuBuilder()
        .setCustomId('add_role')
        .setPlaceholder('Add roles')
        .setMinValues(1)
        .setMaxValues(5);

    const removeRoleMenu = new RoleSelectMenuBuilder()
        .setCustomId('remove_role')
        .setPlaceholder('Remove roles')
        .setMinValues(1)
        .setMaxValues(5);

    const row1 = new ActionRowBuilder().addComponents(addRoleMenu);
    const row2 = new ActionRowBuilder().addComponents(removeRoleMenu);

    const response = await context.channel.send({ embeds: [embed], components: [row1, row2] });
    const collector = response.createMessageComponentCollector({ time: 300000 }); // 5 minutes

    collector.on('collect', async (interaction) => {
        if (interaction.user.id !== context.member.id) return;

        await interaction.deferReply({ ephemeral: true });
        const selectedRoles = interaction.values;
        const action = interaction.customId === 'add_role' ? 'add' : 'remove';
        let resultMessage = "";

        for (const roleId of selectedRoles) {
            const role = await context.guild.roles.fetch(roleId);
            try {
                if (action === 'add') {
                    await target.roles.add(role);
                    resultMessage += `<:verified:1295861975821189183> **Successfully __assigned__ ${role} to ${target}.**\n`;
                } else {
                    await target.roles.remove(role);
                    resultMessage += `<:verified:1295861975821189183> **Successfully __removed__ ${role} from ${target}.**\n`;
                }
            } catch (error) {
                resultMessage += `<a:Cross:1295862782679453782> **Failed to ${action === 'add' ? 'assign' : 'remove'} ${role} ${action === 'add' ? 'to' : 'from'} ${target} | ${error.message}**\n`;
            }
        }

        const resultEmbed = new EmbedBuilder()
            .setColor("#FF69B4")
            .setDescription(resultMessage);

        await interaction.editReply({ embeds: [resultEmbed] });
    });
}

exports.conf = {
    aliases: ["rm", "role", "addrole"]
};

exports.help = {
    name: "rolemenu",
};
