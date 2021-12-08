module.exports = {
	name: "addusers",
	description: "Add users to send the encrypted message to",
	example: "!addusers user1#1234 user2#2345",
	execute(message, args) {
		message.channel.send(
			">>> Now choose your cipher and encrypt your text. \n**!ciphers** to get a list of ciphers"
		);
	},
};
