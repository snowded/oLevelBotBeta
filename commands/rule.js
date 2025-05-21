const { EmbedBuilder } = require('discord.js');

const rules = [
    {
        number: 1,
        title: 'Follow Discord\'s TOS',
        description: '> https://discordapp.com/terms\n> https://discordapp.com/guidelines',
    },
    {
        number: 2,
        title: 'Be respectful with all members',
        description: '> Be respectful to others, No death threats, hate speech, racism (NO N WORD, this includes soft N, unless it\'s the politics channel)\n> No doxing, swatting, witch hunting',
    },
    {
        number: 3,
        title: 'No Advertising',
        description: '> Includes DM Advertising. We do not allow advertising here of any kind.',
    },
    {
        number: 4,
        title: 'No NSFW content',
        description: '> Anything involving gore or sexual content is not allowed.\n> NSFW = Not Safe for Work',
    },
    {
        number: 5,
        title: 'No spamming in text or VC',
        description: '> Do not spam messages, soundboards, voice changers, or ear rape in any channel.',
    },
    {
        number: 6,
        title: 'Do not discuss sensitive topics',
        description: '> This isn\'t a debating server, keep sensitive topics out of here to avoid nasty arguments.',
    },
    {
        number: 7,
        title: 'No malicious content',
        description: '> No grabify links, viruses, crash videos, links to viruses, or token grabbers. These will result in an automated ban.',
    },
    {
        number: 8,
        title: 'No Self Bots',
        description: '> Includes all kinds of selfbots: Nitro snipers, selfbots like nighty, auto changing statuses.',
    },
    {
        number: 9,
        title: 'Do not DM the staff team',
        description: '> Unless it\'s something really important.',
    },
    {
        number: 10,
        title: 'Profile Picture / Banner Rules',
        description: '> No NSFW allowed\n> No racism\n> No brightly flashing pictures to induce an epileptic attack.',
    },
    {
        number: 11,
        title: 'Emoji Rules',
        description: '> No NSFW allowed\n> No racism\n> No brightly flashing pictures to induce an epileptic attack.',
    },
    {
        number: 12,
        title: 'Try to keep chats in English',
        description: '> We cannot easily moderate chats in different languages, sorry. English only. However, if you do want to use Urdu, use #💬︱urdu-chat.',
    }
];

// Command handler
exports.run = async (client, message, args) => {
    // Get the rule number from the user input
    const ruleNumber = parseInt(args[0]?.replace('#', '')); // Extract number from input like #3

    // Check if rule exists
    const rule = rules.find(r => r.number === ruleNumber);

    if (rule) {
        // Create the embed
        const embed = new EmbedBuilder()
            .setTitle(`Rule #${rule.number} - ${rule.title}`)
            .setDescription(rule.description);

        // Send the embed
        message.channel.send({ embeds: [embed] });
    } else {
        // If the rule number is invalid
        const errorEmbed = new EmbedBuilder()
            .setDescription('❌ Invalid rule number. Please specify a valid rule, like `!rule #3`.');

        message.channel.send({ embeds: [errorEmbed] });
    }
};

// Command configuration
exports.conf = {
    aliases: []
};

exports.help = {
    name: "rule"
};
