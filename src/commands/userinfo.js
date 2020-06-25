module.exports = {
  name: 'userinfo',
  description: 'User info',
  cooldown: 5,
  execute(message) {
    message.channel.send(
      `Your username: ${message.author.username}\nYour ID: ${message.author.id}`
    );
  },
};
