This project was made by Jackie Chen and Liam Calnan

Discryption is a bot and requires a machine to run it. To launch the bot:
    1. Download all the files in this repo - https://github.com/jachen199/Discryption
    2. Ensure you have NodeJS installed on your machine - https://nodejs.org/en/
    3. Open a terminal and head to the folder for the repo you just downloaded
    4. Run the command:
        node index.js
    5. If you see:
        Discord bot is online and ready
    Then you are all set. 
    If you do not see it, please contact me at jchen199@syr.edu and I can run the bot while it is in use. 

To add Discryption to your server: 
    1. Go to https://discord.com/app and log into your Discord account
    2. On the left hand side, click on the + icon to create a new server that you want to use Discryption in
    3. Go to https://discord.com/api/oauth2/authorize?client_id=915245122956955749&permissions=8&scope=bot, and then select the server you just created
    4. You are now all set up and can use Discryption.


Using the bot:
    1. In the general text channel, you can type:
        !help
    to see all the commands the discord bot currently accepts.
    2. To get started, type:
        !encrypt 
    This will create a new text channel where you can test the various ciphers. Follow the instructions the bot gives you. 

Example of running a shift cipher:
    1. Type '!encrypt' in the general text channel
    2. Head to the secret-encryption-channel that just got created on the left side of the screen
    3. Type '!addusers @everyone' to send your encrypted message to everyone, or you can send it to specific people only by mentioning them.
    4. Type '!shift 10 encrypt hello world' to encrypt the text 'hello world' using a shift cipher, where you shift it by 10. 
    5. Head to the encrypted-text channel where you can see the encrypted text.
    6. Type '!decrypt' to begin decrypting this message
    7. Head to the secret-decryption-channel that just got created
    8. Type '!shift 10 decrypt ', followed by the encrypted text. 
    9. You should now see the decrypted text. 