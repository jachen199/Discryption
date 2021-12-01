const { prefix, guild } = require("../config.json");

const shift = (args) => {
	return "fake encrypted message";
};
module.exports = {
	name: "shift",
	description:
		"Shift cipher - shifts your message by a given number of characters. Creates a new text channel with the encrypted text and specified users",
	example: '!shift 18 encrypt hello world"',
	execute(message, args) {
		if (message.channel.name === "secret-encryption-channel") {
			//proceed, we are in secret channel
			message.channel.messages
				.fetch({ limit: 100 })
				.then((msgs) => {
					//find when user sent !addusers
					for (const msg of msgs) {
						text = msg[1].content;
						if (!msg[1].author.bot && text.includes("!addusers")) {
							console.log(text);

							users = text
								.slice(prefix.length)
								.trim()
								.split(/ +/);
							//users = ["!addusers", "user1ID", "user2ID", ...]
							//remove the !addusers at the start
							users.shift();

							//create new text channel with the users in users
							permissions = [
								{
									//@everyone role can not view channel
									id: guild,
									deny: ["VIEW_CHANNEL"],
								},
							];
							for (const user of users) {
								//only these users can view it
								userID = user.replace(/[<@!>]/g, "");
								permissions.push({
									id: userID,
									allow: ["VIEW_CHANNEL"],
								});
							}
							message.guild.channels
								.create("encrypted text", {
									type: "text",
									permissionOverwrites: permissions,
								})
								.then((channel) => {
									//send encrypted message
									encryptedText = shift(args);
									channel.send(encryptedText);
									message.channel.delete(5000);
								});
							break;
						}
					}
				})
				.catch((err) => {
					message.channel.send("Add users with !addusers first!");
					console.error(err);
				});
		} else {
			message.channel.send("This command can not be used here");
		}
	},
};
