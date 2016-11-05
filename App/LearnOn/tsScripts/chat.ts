/// <reference path="..\typings\globals\jquery\index.d.ts" />
/// <reference path="..\typings\globals\signalr\index.d.ts" />
/// <reference path="signalr.server.d.ts" />

import { Component } from '@angular/core';

@Component({
    selector: 'chat',
    templateUrl: '../tsScripts/chat.html'
})
export class ChatComponent {
    constructor() {
        $(() => this.initialize());
    }
    public initialize() {
        //var chat = $.connection.chatHub;
        //chat.client.receiveMessage = this.receiveMessage.bind(this);
        //chat.server.sendMessage("Test");
    }
    public receiveMessage(message: string) {
        // Html encode display name and message. 
        var encodedName = $('<div />').text(name).html();
        var encodedMsg = $('<div />').text(message).html();
        // Add the message to the page. 
        $('#discussion').append('<li><strong>' + encodedName
            + '</strong>:&nbsp;&nbsp;' + encodedMsg + '</li>');
    }
}