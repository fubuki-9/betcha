const Discord = require('discord.js');

// Create a new Discord client
const client = new Discord.Client();

// Set up an array to store the ranks and points of each user
const ranks = [];

// Set up a function to update the ranks and points for a given user
function updateRanks(userId, points) {
  // Check if the user already has a rank
  let userRank = ranks.find(rank => rank.userId === userId);

  // If the user doesn't have a rank yet, create one
  if (!userRank) {
    userRank = { userId: userId, points: 0 };
    ranks.push(userRank);
  }

  // Update the points for the user
  userRank.points += points;

  // Sort the ranks array by points
  ranks.sort((a, b) => b.points - a.points);
}

// Listen for messages in the chat
client.on('message', message => {
  // Check if the message starts with the !bet command
  if (message.content.startsWith('!bet')) {
    // Split the message into an array of words
    const words = message.content.split(' ');

    // Get the user's Discord ID
    const userId = message.author.id;

    // Get the amount of points to bet
    const points = parseInt(words[1]);

    // Update the ranks and points for the user
    updateRanks(userId, points);

    // Send a message to the chat with the updated ranks
    let ranksMessage = 'RANKS:\n';
    ranks.forEach((rank, index) => {
      ranksMessage += `${index + 1}. <@${rank.userId}>: ${rank.points} points\n`;
    });
    message.channel.send(ranksMessage);
  }
});

// Log in to Discord with the bot's token
client.login('MTA2MTY2NDkyNDk1NjM2ODkxNw.Ghwyqw.Xjjx_Tt96SyAeoB4rKOWwwSvlAOAKEzKkwobVc');
