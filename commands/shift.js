const { prefix, guild } = require("../config.json");

const encrypt = (args) => {
	numShift = parseInt(args[0]) % 26;
	args.shift();
	args.shift();
	words = args;
	text = "";
	for (word of words) {
		for (char of word) {
			charNum = char.charCodeAt();
			if (charNum == 32) {
				newCharNum = 32;
			} else {
				newCharNum = charNum + numShift;
				if (charNum >= 97 && charNum <= 122 && newCharNum > 122) {
					newCharNum -= 26;
				} else {
					if (charNum >= 65 && charNum <= 90 && newCharNum >= 90) {
						newCharNum -= 26;
					}
				}
			}
			text += String.fromCharCode(newCharNum);
		}
		text += " ";
	}
	return text;
};
const decrypt = (args) => {
	numShift = parseInt(args[0]) % 26;
	args.shift();
	args.shift();
	words = args;
	text = "";
	for (word of words) {
		for (char of word) {
			charNum = char.charCodeAt();
			if (charNum == 32) {
				newCharNum = 32;
			} else {
				newCharNum = charNum - numShift;
				if (charNum >= 97 && charNum <= 122 && newCharNum < 97) {
					newCharNum += 26;
				} else {
					if (charNum >= 65 && charNum <= 90 && newCharNum < 65) {
						newCharNum += 26;
					}
				}
			}
			text += String.fromCharCode(newCharNum);
		}
		text += " ";
	}
	return text;
};

module.exports = {
	name: "shift",
	description:
		"Shift cipher - shifts your message by a given number of characters. Creates a new text channel with the encrypted text and specified users",
	example:
		"!shift {number to shift by} {encrypt/decrypt} {text} \nEx: !shift 10 encrypt hello world",
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
