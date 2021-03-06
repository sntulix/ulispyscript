// Generated by LispyScript v1.0.0
var net = require("net");
var chatServer = net.createServer();
var port = 3000;
var clientList = [];
var broadcast = function(message,client) {
    return (clientList).forEach(function(currentClient) {
        return ((currentClient !== client) ?
            currentClient.write([client.name," says ",message].join('')) :
            undefined);
    });
};
chatServer.on("connection",function(client) {
    client.name = [client.remoteAddress,":",client.remotePort].join('');
    client.write(["Hi ",client.name,"\n"].join(''));
    clientList.push(client);
    client.on("data",function(data) {
        return broadcast(data,client);
    });
    return client.on("end",function() {
        return clientList.splice(clientList.indexOf(client),1);
    });
});
chatServer.listen(port);
