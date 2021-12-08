const { prefix, token } = require("./config.json");
const fs = require("fs");

const Discord = require("discord.js");
const client = new Discord.Client();
client.commands = new Discord.Collection();
client.once("ready", () => {
	console.log("Discord bot is online and ready");
});
client.login(token);

// Easily add more ciphers in the commands folder
const commandFiles = fs
	.readdirSync("./commands")
	.filter((file) => file.endsWith(".js"));

// Add all the commands to a Collection (dictionary)
// stored on the Discord Object
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

function getHelp(message) {
	commands = client.commands.array();

	text = ">>> ";
	for (var i = 0; i < commands.length; i++) {
		let cmd = commands[i];
		text += "**!" + cmd.name + "** : " + cmd.description + "\n";
		text += "       Example: " + cmd.example + "\n";
	}
	message.channel.send(text);
}

client.on("message", (message) => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;
	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();

	if (command === "help") {
		getHelp(message);
	}
	if (!client.commands.has(command)) return;

	try {
		client.commands.get(command).execute(message, args);
	} catch (error) {
		console.error(error);
		message.reply("there was an error trying to execute that command!");
	}
});
