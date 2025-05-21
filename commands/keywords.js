const { EmbedBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, '../keywords.json');

const loadKeywords = () => {
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data);
};

const saveKeywords = (data) => {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

exports.run = async (client, message, args) => {
    if (!message.member.permissions.has("MANAGE_MESAGES")) {
        const embed = new EmbedBuilder()
        .setDescription("> <a:Cross:1295862782679453782> **You aren't Authorized to use this command**")
        .setColor('Red');
    return message.channel.send({ embeds: [embed] });
      }

    if (!args[0]) {
        const embed = new EmbedBuilder()
            .setDescription("> <a:Cross:1295862782679453782> **Please provide an action: `add`, `remove`, or `list`.**")
            .setColor('Red');
        return message.channel.send({ embeds: [embed] });
    }

    const action = args[0].toLowerCase();
    let keywordData = loadKeywords();

    if (action === "add") {
        const keyword = args[1];
        const reply = args.slice(2).join(' ');

        if (!keyword || !reply) {
            const embed = new EmbedBuilder()
                .setDescription("> <a:Cross:1295862782679453782> **Please provide both a keyword and a reply.**")
                .setColor('Red');
            return message.channel.send({ embeds: [embed] });
        }

        const exists = keywordData.keywords.find(k => k.keyword === keyword);
        if (exists) {
            const embed = new EmbedBuilder()
                .setDescription(`> <a:Cross:1295862782679453782> **The keyword \`${keyword}\` already exists.**`)
                .setColor('Red');
            return message.channel.send({ embeds: [embed] });
        }

        keywordData.keywords.push({ keyword, reply });
        saveKeywords(keywordData);

        const embed = new EmbedBuilder()
            .setDescription(`> <:verified:1295861975821189183> **Keyword \`${keyword}\` added successfully!**`)
            .setColor('Green');
        return message.channel.send({ embeds: [embed] });
    }

    else if (action === "remove") {
        const keyword = args[1];

        if (!keyword) {
            const embed = new EmbedBuilder()
                .setDescription("> <a:Cross:1295862782679453782> **Please provide the keyword you want to remove.**")
                .setColor('Red');
            return message.channel.send({ embeds: [embed] });
        }

        const index = keywordData.keywords.findIndex(k => k.keyword === keyword);
        if (index === -1) {
            const embed = new EmbedBuilder()
                .setDescription(`> <a:Cross:1295862782679453782> **The keyword \`${keyword}\` does not exist.**`)
                .setColor('Red');
            return message.channel.send({ embeds: [embed] });
        }

        keywordData.keywords.splice(index, 1);
        saveKeywords(keywordData);

        const embed = new EmbedBuilder()
            .setDescription(`> <:verified:1295861975821189183> **Keyword \`${keyword}\` removed successfully!**`)
            .setColor('Green');
        return message.channel.send({ embeds: [embed] });
    }

    else if (action === "list") {
        if (keywordData.keywords.length === 0) {
            const embed = new EmbedBuilder()
                .setDescription("> <a:Cross:1295862782679453782> **No keywords found.**")
                .setColor('Red');
            return message.channel.send({ embeds: [embed] });
        }

        const keywordList = keywordData.keywords.map(k => `> **KeyWord** : ${k.keyword}\n> **Reply** : ${k.reply}`).join('\n\n');

        const embed = new EmbedBuilder()
            .setTitle('Keywords List')
            .setDescription(keywordList)
            .setColor('Blue');
        return message.channel.send({ embeds: [embed] });
    }

    else {
        const embed = new EmbedBuilder()
            .setDescription("> <a:Cross:1295862782679453782> **Invalid action. Use `add`, `remove`, or `list`.**")
            .setColor('Red');
        return message.channel.send({ embeds: [embed] });
    }
};

exports.conf = {
    aliases: []
};

exports.help = {
    name: "keyword"
};
