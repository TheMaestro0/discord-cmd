const { Client } = require("eris");
const { prompt } = require("promptly");
const { token, channel_id } = require("./config");
const client = new Client(token);

client
    .on("cmdMessage", content => client.createMessage(channel_id, content))
    .on("messageCreate", message => {
        if (message.author.bot || message.channel.id !== channel_id) return;
        if (isEmpty(message.content)) return;
        console.log(`[${message.author.username + "#" + message.author.discriminator}]: ${message.content}`);
    }).connect();

function isEmpty(str) {
    if (typeof str !== "string") return true;
    if (!str || !str.trim()) return true;
    return false;
}

async function _prompt() {
    const msg = await prompt();
    if (msg) client.emit("cmdMessage", msg);
    _prompt();
}

_prompt();