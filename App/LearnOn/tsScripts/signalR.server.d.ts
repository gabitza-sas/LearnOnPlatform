interface SignalR {
    chatHub: IChatHub;
}

interface IChatHub extends SignalR.Hub.Proxy {
    server: IChatHubServer;
    client: IChatHubClient;
}

interface IChatHubServer {
    sendMessage(messsage: string);
}

interface IChatHubClient {
    receiveMessage(message: string): IChatHubClient;
}
