module.exports = {
    name: "test",
    alias:["tst"],
    permissions: [],
    description: "test command", 
    execute(message, args){
        msg.channel.send("Malice Active")
    }
}