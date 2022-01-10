//Looking around? 
let fs = require("fs");
const config = JSON.parse(fs.readFileSync("config.json", "utf-8"));
const Discord = require("discord.js");
const { Client } = ("discord.js");
const client = new Discord.Client();
const prefix = (config.prefix);
const token = (config.bot_token);
const color = (config.color);
const name = (config.name);
const sChannel = (config.suggestionChannel);
const SBon = (config.suggestionbot)


client.on("ready", () => {
    console.log("#################################");
    console.log("#################################");
    console.log("##    BlueHeberg Suggestions        ##");
    console.log("##       Suggestion Bots       ##");
    console.log("##           Online            ##");
    console.log("#################################");
    console.log("#################################");
});

client.on("message", message => {
    if (!message.content.startsWith(prefix)) return;
    let args = message.content.substring(prefix.length).split(" ")

    if (args[0] === "suggest") {
        suggest(message, args)
    }
    else if (args[0] === "help") {
        help(message, args)
    }
    else if (args[0] === "restart") {
        restart(message, args)
    }
    function restart(message, args) {
        if (!message.member.hasPermission('MANAGE_GUILD')) {
        message.channel.send("Vous n'avez pas la permission de redémarrer le bot !")
        }
        else{
        let embed = new Discord.RichEmbed()
            .setColor(color)
            .setTitle(name)
            .setDescription("**Restarting...**")
            .setFooter(message.author.tag, message.author.avatarURL)
            .setTimestamp(new Date())
        return message.channel.send(embed).then(
            setTimeout(() => {
                process.exit()
            }, 500)

        );
        }

    }
    function help(message, args) {

        let embed = new Discord.RichEmbed()
            .setColor(color)
            .setThumbnail(message.author.avatarURL)
            .setTitle(name)
            .addField(prefix + "suggest <suggestion> **->**", "Makes a suggestion")
            .addField(prefix + "restart **->**", "Redémarre le bot")
            .setDescription("Fournit la liste des commandes.")
            .setFooter(message.author.tag, message.author.avatarURL)
            .setTimestamp(new Date())
        return message.channel.send(embed).then(
            sentEmbed => {
                sentEmbed.react("✅");

            }

        );
    }

        function suggest(message, args) {
            if (!args[1]) message.channel.send("Vous avez besoin d'une suggestion !")
            else if (SBon == false) return message.channel.send("Nous ne prenons pas de suggestions pour le moment.").then(
                console.log(message.author.tag + " A tenté de faire une suggestion !"))
           else if (!args) return message.channel.send("Vous devez suggérer quelque chose !")

            else {

                let content = args.splice(1).join(" ")

                let embed = new Discord.RichEmbed()
                    .setColor(color)
                    .setThumbnail(message.author.avatarURL)
                    .setTitle(name)
                    .addField("**Suggestion**", content)
                    .setFooter("Realise par " + message.author.tag, message.author.avatarURL)
                    .setTimestamp(new Date())
                let embedsent = new Discord.RichEmbed()
                    .setColor(color)
                    .setDescription("(!) L'équipe technique regardera vos suggestions")
                return client.channels.get(sChannel).send(embed).then(sentEmbed => {
                    sentEmbed.react("✅").then(
                        setTimeout(() => {
                            (message.delete({ timeout: 6000 })).then(sentEmbed.react("❌")).then(message.channel.send(embedsent)), (5000)
                        }), 10000)
                })

            }

        };
});

client.login(process.env.TOKEN);