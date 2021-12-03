module.exports = {
	name: "ciphers",
	description: "List all the ciphers that are available",
	example: "!ciphers",
	execute(message, args) {
		text =
			">>> For detailed descriptions of each cipher, do **!help** \n **!shift** : Shift cipher \n ";
		message.channel.send(text);
	},
};
