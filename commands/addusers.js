const {guild} = require('../config.json');

module.exports = {
	name: 'addusers',
	description: 'Add users to send the encrypted message to',
	example: 'Generic example: !addusers user1#1234 user2#2345 ...',
	execute(message, args) {
        console.log(message);
        console.log(args);
        message.channel.send("does not do anything");
    }
};