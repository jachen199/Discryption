const { prefix, guild } = require("../config.json");

const encrypt = (args) => {
	return "fake SHIFT encrypted message";
};
const decrypt = (args) => {
	return "fake SHIFT decrypted message";
};

module.exports = {
	name: "byte-shift",
	description:
		"Byte-wise Shift Cipher - shifts your message by a given number of bytes. Creates a new text channel with the encrypted text and specified users",
	example:
		"!byte-shift {number of bytes to shift by} {encrypt/decrypt} {byte message} \n ex: !shift 11001110 encrypt 00011010 00011010 00011010",
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
									encryptedText = encrypt(args);
									channel.send(
										"This message is for the following users: " +
											users
									);
									channel.send(encryptedText);
									message.channel.send(
										"Deleting this text channel in 10 seconds"
									);
									setTimeout(
										() => message.channel.delete(),
										10000
									);
								});
							break;
						}
					}
				})
				.catch((err) => {
					message.channel.send("Add users with !addusers first!");
					console.error(err);
				});
		} else if (message.channel.name === "secret-decryption-channel") {
			decryptedText = decrypt(args);
			message.channel.send(decryptedText);
			message.channel.send("Deleting this text channel in 10 seconds");
			setTimeout(() => message.channel.delete(), 10000);
		} else {
			message.channel.send("This command can not be used here");
		}
	},
};
