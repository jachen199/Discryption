const { guild } = require("../config.json");

module.exports = {
	name: "decrypt",
	description:
		"Creates a private text channel between you and the bot so you can decrypt an encrypted message",
	example: "!decrypt",
	execute(message, args) {
		if (message.channel.name === "encrypted-text") {
			message.guild.channels
				.create("Secret Decryption Channel", {
					type: "text",
					permissionOverwrites: [
						{
							//@everyone role can not view channel
							id: guild,
							deny: ["VIEW_CHANNEL"],
						},
						{
							//only author of the message can view channel
							id: message.author.id,
							allow: ["VIEW_CHANNEL"],
						},
					],
				})
				.then((channel) => {
					//channel = text channel object that we just created
					channel.send(
						">>> To decrypt a message, choose your cipher using **!ciphers** then specify the arguments and decrypt, and then followed by the encrypted text"
					);
				});
			//check if everyone in this text channel has run decrypt. if they have, then we delete the channel.
		} else {
			message.channel.send("This command can not be used here");
		}
	},
};
