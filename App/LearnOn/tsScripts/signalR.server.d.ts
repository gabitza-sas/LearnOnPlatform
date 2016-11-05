interface SignalR {
    chatHub: IChatHub;
}

interface IChatHub extends SignalR.Hub.Proxy {
    server: IChatHubServer;
    client: IChatHubClient;
}

interface IChatHubServer {
    sendMessage(messsage: string): JQueryPromise<void>;
    joinCourse(courseId: number): JQueryPromise<void>;
}

interface IChatHubClient {
    receiveMessage(message: string): IChatHubClient;
}
