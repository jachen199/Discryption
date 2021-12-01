const { guild } = require("../config.json");

module.exports = {
	name: "encrypt",
	description:
		"Creates a private text channel between you and the bot so you can send an ecrypted message",
	example: "!encrypt",
	execute(message, args) {
		message.guild.channels
			.create("Secret Encryption Channel", {
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
					">>> Specify who the recipents are with !addusers, and then send your message with the cipher of your choice"
				);
			});
	},
};
