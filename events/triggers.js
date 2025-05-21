const { EmbedBuilder, Embed } = require("discord.js");
const client = require("..");

client.on("messageCreate", async (message) => {
    if (!message.guild || message.author.bot) return;

    if (message.content.trim().toLowerCase() === "sigma") {
        if (message.author.id === '747007326619172924') {
            return message.channel.send('🤤');
        }
    }
});

client.on("messageCreate", async (message) => {
    if (!message.guild || message.author.bot) return;

    // Define a regular expression to match similar phrases with optional expletives
    const regex = /(this|the)?\s?(bot)\s?(fucking\s)?(sucks|is bad|is awful|is terrible)/i;

    // Test the message content against the regex (case-insensitive)
    if (regex.test(message.content)) {
        return message.channel.send('<:gatodepresso:1295863816147435530>');
    }
});



client.on("messageCreate", async (message) => {
    if (!message.guild || message.author.bot) return;

    const triggers = {
        'al syllabus': 'https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-advanced/cambridge-international-as-and-a-levels/subjects/',
        'mf19': 'https://www.cambridgeinternational.org/Images/417318-list-of-formulae-and-statistical-tables.pdf',
        'transtestnh3': 'https://cdn.discordapp.com/attachments/853585554797101066/1205557495641411654/image.png?ex=670fefe9&is=670e9e69&hm=821a260dff05aa30e712eee39de788bd31f05f087cf98f7b21e1bc6f5cf5baff&',
        'transtestnaoh': 'https://cdn.discordapp.com/attachments/853585554797101066/1205555482937262080/image.png?ex=670fee09&is=670e9c89&hm=abc7bcb8fa8d2678aa4f73262393262210584ed5f379d77305ea048387637909&',
        'bond angles': 'https://media.discordapp.net/attachments/697072778553065542/1235874097045573662/image0.png?ex=670f7c72&is=670e2af2&hm=aac4f13538d1db128b6c88675476f91774523c81783771832d53e12abe777989&format=webp&quality=lossless&',
        'estimation1': 'https://cdn.discordapp.com/attachments/857884766832427048/1295858142655287358/image.png?ex=67102d71&is=670edbf1&hm=e4cd1129bbe6e22b4b9165e32bb59a2f997d178bbf0bc4c48503d72dd10bc1af&',
        'estimation2': 'https://cdn.discordapp.com/attachments/857884766832427048/1295858533761286304/image.png?ex=67102dce&is=670edc4e&hm=a666b73c3bc6177336abf7cfbb6ad01560a5c61fe0ad5de8996c58f1d99b50ee&',
        'physics formulae': 'https://qualifications.pearson.com/content/dam/pdf/A%20Level/Physics/2015/Specification%20and%20sample%20assessments/a-level-physics-data-formulae-relationships.pdf',
        'projectile motion equations': 'https://cdn.discordapp.com/attachments/1257922595253125120/1295842413150994566/747007326619172924.png?ex=67101eca&is=670ecd4a&hm=b58d985fdd6f8d2689516024df0bf24cf81c7029c4810e45de84509306c4680f&',
        'graphing calculator': 'https://www.desmos.com/calculator',
        'studyhaven': 'https://studyhaven.xyz/main/dashboard',
        'em spectrum': 'https://cdn.savemyexams.com/cdn-cgi/image/w=1920,f=auto/uploads/2020/09/7.1.4.2-Table-of-EM-spectrum-wavelengths-and-frequencies.png',
        'organic mindmap': 'https://media.discordapp.net/attachments/853585554797101066/1239097155717955605/IMG_1197.png?ex=67100167&is=670eafe7&hm=1dc89a6805eef729b91455e24f51a224410eab611edd9a02647d4f4ec72d5225&format=webp&quality=lossless&width=1000&height=764&',
        'prerequisitesfm': 'https://cdn.discordapp.com/attachments/853587786099982396/1285680473191878757/image.png?ex=671010bf&is=670ebf3f&hm=e1a53f2df55ee2b50abde3ccb64f6d9c2f587d05c55ccdbbd995ebefdacbc6a3&'
    };

    const trigger = message.content.trim().toLowerCase();

    if (triggers[trigger]) {
        const url = triggers[trigger];

        // Create an embed with only the author field (no footer)
        const embed = new EmbedBuilder()
            .setAuthor({
                name: `${trigger}`,
                iconURL: message.guild.iconURL(),
            });


        if (/\.(png|jpg|jpeg|webp)$/i.test(url) || url.startsWith("https://cdn.") || url.startsWith("https://media.")) {

            await message.channel.send({ embeds: [embed] });
            return message.channel.send({ files: [url] });
        } else {
 
            embed.setDescription(`**[Click here!](${url})**`);
            return message.channel.send({ embeds: [embed] });
        }
    }
});


client.on("messageCreate", async (message) => {
    if (!message.guild || message.author.bot) return;

    if (message.content.trim().toLowerCase() === 'physicsyt') {
        
        const phy = new EmbedBuilder()
        .setAuthor({
            name: `PhysicsYt`,
            iconURL: message.guild.iconURL()
        })
        .setDescription(`
**1) [Physics with Sir Faizan Pasha](https://youtube.com/channel/UC66vaRFHoZyOdpd4Ge9UPyA)**  
**2) [Science Shorts](https://youtube.com/c/ScienceShorts)**  
**3) [ET Physics](https://www.youtube.com/channel/UCsFE9IEJ3GfAMeDsbJKDxTQ)**  
**4) [Physics with Nausher Alam](https://youtube.com/channel/UC8EgScabWSJxglMFXEnhRcg)**  
**5) [Physics Online](https://youtube.com/c/PhysicsOnline)**  
**6) [GorillaPhysics](https://youtube.com/c/GorillaPhysicsA)**  
**7) [Abraham Institute](https://youtube.com/playlist)**  
**8) [Whales College AL Channel / Sir Qamar Hussain's Playlist](https://youtube.com/playlist)**  
**9) [Organic Chemistry Tutor](https://youtube.com/c/TheOrganicChemistryTutor)**  
**10) [Pharero Academy](https://youtube.com/playlist)**  
**11) [SnapRevise](https://youtube.com/playlist)**  
**12) [Burrows Physics](https://youtube.com/c/LAEPhysics)**  
**13) [DrPhysicsA](https://youtube.com/playlist?list=PL5D99A319E129A5B7)**  
**14) [Sir Irfan YT Channel](https://youtube.com/channel/UCxgkrIfmrDN46CqQly8Y4ow)**  
**15) [Flipping Physics](https://youtube.com/c/Flippingphysics2013)**  
**16) [Zphysics](https://youtube.com/channel/UC3L5MO3gJTlB09wmmHGW5Qg)**
            `);
            return message.channel.send({ embeds: [phy]})
    }
});

const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, '../keywords.json');

// Load the keywords data from the JSON file
const loadKeywords = () => {
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data);
};

client.on('messageCreate', async (message) => {
    if (message.author.bot) return;

    const keywordData = loadKeywords();

    keywordData.keywords.forEach(item => {
        if (message.content.toLowerCase().includes(item.keyword.toLowerCase())) {
            message.channel.send(item.reply);
        }
    });
});


/*
al syllabus
mf19
transtestnh3
transtestnaoh
bond angles
estimation1
estimation2
physics formulae
projectile motion equations       
graphing calculator
studyhaven
organic mindmap
prerequisitesfm
*/