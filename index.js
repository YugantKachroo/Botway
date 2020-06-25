const Discord = require('discord.js');
const dotenv = require('dotenv');
const ytdl = require('ytdl-core');
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

client.on('message', async (message) => {
  if (message.author.bot) return;
  if (!message.content.startsWith(process.env.DISCORD_PREFIX)) return;
  const args = message.content.split(' ');

  if (message.content.startsWith(`${process.env.DISCORD_PREFIX}play`)) {
    const voiceChannel = message.sender.voiceChannel;
    if (!voiceChannel)
      return message.channel.send('You need to be in a voice channel');
    const permissions = voiceChannel.permissionsFor(message.client.user);
    if (!permissions.has('CONNECT'))
      return message.channel.send(
        "I cannot connect to your channel as I don't have the permission"
      );
    if (!permissions.has('SPEAK'))
      return message.channel.send(
        "I cannot speak in your channel as I don't have the permission"
      );
    try {
      var connection = await voiceChannel.join();
    } catch (error) {
      console.error(err);
      return message.channel.send(
        `I could not join your voice channel: ${error}`
      );
    }
    const dispatcher = connection
      .playStream(ytdl(args[1]))
      .on('end', () => {
        console.log('Song ended');
        voiceChannel.leave();
      })
      .on('error', (error) => {
        console.error(error);
      });
    dispatcher.setVolumeLogarithmic(5 / 5);
  }
});

client.login(process.env.DISCORD_TOKEN);
