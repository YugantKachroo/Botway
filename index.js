const Discord = require('discord.js');
const dotenv = require('dotenv');
dotenv.config();

const client = new Discord.Client({ disableEveryone: true });

client.on('warn', () => {
  console.warn;
});

client.on('error', () => {
  console.error;
});

client.on('ready', () => {
  console.log('Ready!');
});

client.on('reconnecting', () => {
  console.log('Reconnecting!');
});

client.on('disconnect', () => {
  console.log('Disconnect!');
});

client.on('message', (message) => {
  if (message.author.bot) return;
  if (!message.content.startsWith(DISCORD_PREFIX)) return;
  const args = message.content.split(' ');

  if (message.content.startsWith(`${process.env.DISCORD_PREFIX}play`)) {
    const voiceChannel = message.sender.voiceChannel;
    if (!voiceChannel) return message.channel;
  }
});

client.login(process.env.DISCORD_TOKEN);
