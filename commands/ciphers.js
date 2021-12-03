module.exports = {
	name: "ciphers",
	description: "List all the ciphers that are available",
	example: "!ciphers",
	execute(message, args) {
		text =
			">>> For detailed descriptions of each cipher, do **!help** \n**!shift** : Shift Cipher \n **!vigenere** : Vigenere Cipher \n" + 
			"**!byte-shift** : Byte-wise Shift Cipher \n **!byte-vigenere** : Byte-wise Vigenere Cipher \n";
		message.channel.send(text);
	},
};
