const { prefix, guild } = require("../config.json");

const encrypt = (args) => {
	wordShift = args.shift();
	wordIndex = 0;
	words = args.splice(1).join(" ");
	text = "";
	for (char of words) {
		if (char.charCodeAt() == 32) {
			text += " ";
		} else {
			key = parseInt(wordShift.charAt(wordIndex));
			wordIndex++;
			if (wordIndex >= wordShift.length) {
				wordIndex -= wordShift.length;
			}
			text += parseInt(char) ^ key;
		}
	}
	return text;
};

const decrypt = (args) => {
	return encrypt(args);
};

module.exports = {
	name: "byte-vigenere",
	description:
		"Byte-wise Vigenere Cipher - Encrypts/Decrypts your message using Vigenere Cipher. Creates a new text channel with the encrypted text and specified users",
	example:
		"!byte-vigenere {bytes} {encrypt/decrypt} {text} \nEx: !byte-vigenere 1010 encrypt 10101010 01010101 11001100",
	execute(message, args) {
		if (message.channel.name === "secret-encryption-channel") {
			if (args[1] === "encrypt") {
				//proceed, we are in secret channel
				message.channel.messages
					.fetch({ limit: 100 })
					.then((msgs) => {
						//find when user sent !addusers
						for (const msg of msgs) {
							text = msg[1].content;
							if (
								!msg[1].author.bot &&
								text.includes("!addusers")
							) {
								users = text
									.slice(prefix.length)
									.trim()
									.split(/ +/);
								//users = ["!addusers", "user1ID", "user2ID", ...]
								//remove the !addusers at the start
								users.shift();
								if (users == "@everyone") {
									permissions = [
										{
											//@everyone role can not view channel
											id: guild,
											allow: ["VIEW_CHANNEL"],
										},
									];
								}
								//create new text channel with the users in users
								else {
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
			} else {
				message.channel.send("Follow the format!");
			}
		} else if (message.channel.name === "secret-decryption-channel") {
			if (args[1] == "decrypt") {
				decryptedText = decrypt(args);
				message.channel.send(decryptedText);
				message.channel.send(
					"Deleting this text channel in 10 seconds"
				);
				setTimeout(() => message.channel.delete(), 10000);
			} else {
				message.channel.send("Follow the format!");
			}
		} else {
			message.channel.send("This command can not be used here");
		}
	},
};
