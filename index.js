// StitchTheSwitchBot Developed by ModoSN

// requirements
const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client({disableEveryone: true});
bot.commands = new Discord.Collection()

fs.readdir("./commands/", (err, files) => {
  if(err) console.log(err);

  let jsfile = files.filter(f => f.split(".").pop() === "js")
  if(jsfile.length <= 0){
    console.log("Couldn't find commands.");
    return;
  }

  jsfile.forEach((f, i) =>{
    let props = require(`./commands/${f}`);
    console.log(`${f} loaded!`);
    bot.commands.set(props.help.name, props);
  });
});
// end of requirements

// notes
// message.guild.channels.find(`name`, "💬general").
// message.guild.channels.find(`name`, "📘staff-logs-discord").

// when bot goes online, log it and set the bot's activity
bot.on("ready", async () => {
  console.log(`${bot.user.username} is online!`);
  bot.channels.find(`name`, "📘staff-logs-discord").send(`<@${bot.user.id}> is connected and online.`);
  bot.user.setActivity("Sam crying",{type: "Listening"});
});

// new enter
bot.on('guildMemberAdd', member => { // when user joins the server
  const channel = member.guild.channels.find(ch => ch.name === '💬general'); // define general channel
  if (!channel) return; // do nothing if channel does not exist
  channel.send(`<@${member.user.id}> has just joined the server. I have given them the member role.`); // send message
  console.log(`${member} has joined the server.`);
  member.addRole(member.guild.roles.find(role => role.name === "member"));
});

// new leave
bot.on('guildMemberRemove', member => { // when user leaves the server
  const channel = member.guild.channels.find(ch => ch.name === '💬general'); // define general channel
  if (!channel) return; // do nothing if channel does not exist
  channel.send(`Goodbye, ${member}!`); // send message
});
//


// if new message with link in the memes channel is posted, add the reaction voting
bot.on("message", async message => {
if(message.content.includes('http') && message.channel.id === "563724403188432898") {
    message.react('✅').then( () =>{
      message.react('❌')});
}
});


// if message in memes channel gets x amount of cross reacts then delete it
bot.on('messageReactionAdd', (reaction, user) => {
	if (reaction.message.channel.id === "563724403188432898" && reaction.emoji == "❌" && reaction.count >  2){
	reaction.message.delete();
	bot.channels.get("563724877358432267").send("I just deleted a message in the 💯memes channel, people voted against it :(");
	}	
});

//msg delete
/*
bot.on("messageDelete", (messageDelete) => {
//bot.channels.get("563724877358432267").send(`<@${messageDelete.client.id}> just deleted the message "${messageDelete.content}" by <@${messageDelete.author.id}> in ${messageDelete.channel}.`);
//
let msgdelEmbed = new Discord.RichEmbed()
  .setAuthor("Message Deleted", "https://cdn2.iconfinder.com/data/icons/round-interface-1/217/50-512.png")
  .setDescription(`**Channel:** ${messageDelete.channel}\n**Author:** <@${messageDelete.author.id}>\n**Message:** ${messageDelete.content}`)
  .setColor("#ff0000")
  .setFooter(`ID: ${messageDelete.id} • ${messageDelete.type}`)
  .setTimestamp()
  bot.channels.get("563724877358432267").send(msgdelEmbed);
//
});
//*/
//
//
//
//
bot.on('channelCreate', member => {
	console.log("new channel");
	const channel = member.guild.channels.find(ch => ch.name === '📘staff-logs-discord'); // define general channel
	if (!channel) return; // do nothing if channel does not exist
	channel.send(`new channel created`); // send message
	
});

bot.on('messageDelete', (messageDelete) => { // when user leaves the server
  const channel = messageDelete.guild.channels.find(ch => ch.name === '📘staff-logs-discord'); // define general channel
  if (!channel) return; // do nothing if channel does not exist
  channel.send(`message deleted`); // send message
});
	

//
//
//
//
// command controller
bot.on("message", async message => {
  if(message.author.bot) return; // do nothing if the message is from a bot
  if(message.channel.type === "dm") { message.reply("Bruh, get out of my dms...")}; // reply if the message is direct message

  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  let commandfile = bot.commands.get(cmd.slice(prefix.length)); //get files
  if(commandfile) commandfile.run(bot,message,args);

// hello command
  if(cmd === `${prefix}hello`){
    return message.channel.send("Talking to a bot? Fucking loser.");
  }

// ping command
  if(cmd === `${prefix}ping`){
    return message.channel.send("...pong :rolling_eyes:");
  }

// dad joke, hi im stitch
  if(cmd == `im`){
    let dUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    let dadim = args.join(" ");
    message.channel.send(`Hi ${dadim}, I'm Stitch!`)
    return;
  }
  
// israeli fuck adam
if(message.author.id == '254566198740516865'){
	if (Math.random() < 0.1)
		return message.channel.send("Listen here <@254566198740516865>, you israeli fuck :flag_il:. No one cares what you have to say :feelsisraelman:")
  }

// help command
  if(cmd === `${prefix}help`){

    return message.channel.send("**User Commands**\n>**!hello** - Test command, returns a nice message.`User`\n>**!ping** - Ping the bot, see if he is alive.`User`\n>**!help** - Display a list of commands.`User`\n>**!botinfo** - Shows information about the bot.`User`\n>**!serverinfo** - Shows information about the server.`User`")
  }
  
// ddos joke
  if(message.content.includes('ddos')) {
    message.reply('A distributed denial-of-service attack? That sounds fun.');
}
  
// fuck the government, fuck boris
    if(message.content.includes('boris')) {
    message.reply('http://switchnetwork.co/discord/fckgovbor.mp4');
}

// fuck donald trump
    if(message.content.includes('trump')) {
    message.reply('http://switchnetwork.co/discord/fckdon.mp4');
}

});

// End of file tbh... // end of commands
bot.login(botconfig.token); // bot login with botconfig.json
bot.login(botconfig.token); // bot login with botconfig.json