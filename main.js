const Discord = require('discord.js')
const fs      = require('fs')
const config  = JSON.parse(fs.readFileSync('config.json', 'utf8'))
const colors  = JSON.parse(fs.readFileSync('colors.json', 'utf8'))



var client    = new Discord.Client()

client.on('ready', () => {
    console.log(`Logged in as ${client.user.username}...`)

    if(config.activity.streaming == true) {
        client.user.setActivity(config.activity.stream, {url: config.activity.url})
        console.log(`Die Aktivität wurd erfolgreich zu '${config.activity.stream}' gesetzt!`)
    } else {
        client.user.setActivity(config.activity.game)
        console.log(`Aktivität wurde erfolgreich zu '${config.activity.game}' gesetzt!`)
    }
})


client.on('message', (msg) => {
    var cont      = msg.content,
        author    = msg.member,
        channel   = msg.channel,
        guild     = msg.guild,
        pchannel  = msg.author.dmChannel
        

    if(author.id != client.user.id && cont.startsWith(config.prefix + "help")) {
        if(author.hasPermission('SEND_MESSAGES')) {
            let letEmbed1 = new Discord.RichEmbed()
                .setColor(colors.aquamarin)
                .setTitle("!help")
                .setDescription("Hier bekommst du Hilfe!")
                .addField("**Mitglieder**", `- ${msg.guild.memberCount} -`)
                .addField("!clan", `Damit bekommst du die Mitglied rolle!`, true)
                .addField("!github", `Damit bekommst du die GitHub Rolle!`, true)
            channel.sendEmbed(letEmbed1)
        } if(author.hasPermission('ADMINISTRATOR')) {
            let letEmbed1A = new Discord.RichEmbed()
                .setColor(colors.aquamarin)
                .addField("**Admin Commands**", `Können nur von Orlando_XD ausgefürht werden`)
                .addField(".offline", `Setzt den Bot auf offline!`, true)
                .addField(".online", `Setzt den Bot wieder auf online!`, true)
                .addField(".s-activity", `Damit wird die Streamactivity aktiviert!`, true)
                .addField(".n-activity", `Setzt die Activity wieder auf ${config.activity.game}`, true)
        channel.sendEmbed(letEmbed1A)
        }

    } if(author.id != client.user.id && cont.startsWith(config.adminprefix + "n-activity")) {
        if(author.hasPermission('ADMINISTRATOR')) {
            client.user.setActivity(config.activity.game, {type: 'PLAYING'})
            console.log(`Die Aktivität wurd erfolgreich zu '${config.activity.stream}' gesetzt!`)
            let letEmbed2 = new Discord.RichEmbed()
                .setColor(colors.aquamarin)
                .addField(`${author.displayName} hat die Aktivität geändert!`, `requesetd by ${author.displayName}`);
            channel.sendEmbed(letEmbed2)
        } else {
            console.log(`'n-activity' >> Der User ${author.displayName} hat versucht den Command "n-activity" auszufuehren!`)
        }
    } if(author.id != client.user.id && cont.startsWith(config.prefix + "clan")) {
        author.addRole('592028853598289937')
        let letEmbed5 = new Discord.RichEmbed()
            .setColor(colors.aquamarin)
            .addField("**Du bist Nun ein Mitglied!**", `requested by ${author.displayName}`);
        channel.sendEmbed(letEmbed5)
    } if(author.id != client.user.id && cont.startsWith(config.prefix + "github")) {
        author.addRole('602104149634711594')
        let letEmbed7 = new Discord.RichEmbed()
            .setColor(colors.weiß)
            .addField("Du hast nun Zugriff auf den channel #github!", `Dort kannst du Die Projekte von Orlando_XD abrufen!`);
        channel.sendEmbed(letEmbed7)
    } if(author.id != client.user.id && cont.startsWith("test")) {
        author.sendMessage("TEST")
    } if(author.id == config.owner && cont.startsWith(config.adminprefix + "offline")) {
            client.user.setStatus('invisible')
            let letEmbed4 = new Discord.RichEmbed()
                .setColor(colors.rot)
                .addField("Der Bot wird nun auf Offline gesetzt! (du kannst den Bot allerdings noch verwenden solange er in der Konsole aktiv ist!)", `requesetd by ${author.displayName}`);
            channel.sendEmbed(letEmbed4)
        } if(author.id == config.owner && cont.startsWith(config.adminprefix + "s-activity")) {
                client.user.setActivity(config.activity.stream, {url: config.activity.url})
                console.log(`Aktivität wurde erfolgreich zu '${config.activity.game}' gesetzt!`)
                let letEmbed3 = new Discord.RichEmbed()
                    .setColor(colors.aquamarin)
                    .addField(`${author.displayName} hat die Aktivität geändert!`, `requesetd by ${author.displayName}`);
                channel.sendEmbed(letEmbed3)
        } if(author.id == config.owner && cont.startsWith(config.adminprefix + "online")) {
            client.user.setStatus('online')
            let letEmbed6 = new Discord.RichEmbed()
                .setColor(colors.rot)
                .addField("Der Bot wird nun auf Online gesetzt!", `requesetd by ${author.displayName}`);
            channel.sendEmbed(letEmbed6)
        } if(author.id != client.user.username && cont.startsWith(config.prefix + "send")) {
            var args = cont.split(' ').slice(1)
            if(args == 0) {
                channel.sendMessage(`<@${author.id}>, du musst einen text dazuschreiben!`)
            } else {
            channel.sendMessage(args)
            }
        }
        
})


client.login(config.token)
