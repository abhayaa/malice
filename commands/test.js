module.exports = {
    name: "test",
    description: "just a test function",
    execute(client, message, args, Discord){
        message.channel.send("Active");
    }
}