const client = require("../index");
const { Collection } = require("discord.js");
const fs = require("fs");

client.on("ready", () => {
    console.log(`${client.user.tag} Bot Online!`);
    client.user.setActivity(`With your Grades!`);

    client.commands = new Collection();
    client.aliases = new Collection();

    fs.readdir("./commands/", (err, files) => {
        if (err) console.error(err);
       

        files.forEach(f => {
            try {
                let props = require(`../commands/${f}`);
                
                // Check if command is correctly structured
                if (!props.help || !props.help.name) {
                    console.error(`❌ Error: Command file ${f} is missing the "help" property or "name" in it.`);
                    return;
                }

                console.log(`// 🎀 ${props.help.name}.js Loaded! \\`);
                console.log(`-------- 👾 ${files.length} Total Commands! ---------`);

                client.commands.set(props.help.name, props);
                props.conf.aliases.forEach(alias => {
                    client.aliases.set(alias, props.help.name);
                });
            } catch (error) {
                console.error(`❌ Failed to load command ${f}:`, error);
            }
        });
    });
});
