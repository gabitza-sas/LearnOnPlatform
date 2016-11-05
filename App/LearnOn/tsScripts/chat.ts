/// <reference path="..\typings\globals\jquery\index.d.ts" />
/// <reference path="..\typings\globals\signalr\index.d.ts" />
/// <reference path="signalr.server.d.ts" />

import { Component, Input } from '@angular/core';
import { NgModule } from '@angular/core';
import { Http, Response, HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import Vm = LearnOn.Controllers.Odata;

@Component({
    selector: 'chat',
    templateUrl: '../tsScripts/chat.html'
})
export class ChatComponent {
    courseId: number;
    messages: Vm.ChatMessageViewModel[] = [];
    @Input() newMessage: string = "";
    server: IChatHubServer
    constructor(private http: Http) {
        this.courseId = 1;
        $(() => this.initialize());
    }
    public initialize() {
        var chat = $.connection.chatHub;
        chat.client.receiveMessage = this.receiveMessage.bind(this);
        this.server = chat.server;
        $.connection.hub.start()
            .then(() =>
            {
                chat.server.joinCourse(this.courseId);
                chat.server.sendMessage("Test")
            });
    }

    getCourses() {
        return this.http.get(`/odata/ChatMessages/$filter=CourseId eq ${this.courseId}`)
            .subscribe((value) => {
                this.messages = value.json().value;
            });
    }

    public receiveMessage(message: Vm.ChatMessageViewModel) {
        this.messages.push(message);
    }

    public sendMessage() {
        this.server.sendMessage(this.newMessage);
        this.newMessage = "";
    }
}