/// <reference path="..\typings\globals\jquery\index.d.ts" />
/// <reference path="..\typings\globals\signalr\index.d.ts" />
/// <reference path="signalr.server.d.ts" />

import { Component, Input } from '@angular/core';
import { NgModule } from '@angular/core';
import * as moment from 'moment';
import { Http, Response, HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import Vm = LearnOn.Controllers.Odata;

@Component({
    selector: 'chat',
    templateUrl: '../tsScripts/chat.html'
})
export class ChatComponent {
    courseId: number;
    takeCount = 5;
    messages: Vm.ChatMessageViewModel[] = [];
    @Input() newMessage: string = "";
    server: IChatHubServer
    refTime = new Date();
    totalMessageCount = 0;
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
            });
        this.getCourses(0)
            .subscribe((value) => {
                this.updateTime();
                var json = value.json();
                this.messages = json.value;
                this.totalMessageCount = json['@odata.count'];
            });
        setInterval(() => this.updateTime(), 5000);
    }
    updateTime() {
        this.refTime = new Date();
    }

    getCourses(skip: number) {
        return this.http.get(`/odata/ChatMessages?$filter=CourseId eq ${this.courseId}&$orderby=Time desc&$top=${this.takeCount}&$skip=${skip}&$count=true`)
    }

    public receiveMessage(message: Vm.ChatMessageViewModel) {
        this.messages.splice(0, 0, message);
    }

    public sendMessage() {
        this.server.sendMessage(this.newMessage);
        this.cancelMessage();
    }
    public cancelMessage() {
        this.newMessage = "";
    }


    isLoading = false;

    public showMore() {
        if (!this.isLoading) {
            this.isLoading = true;
            this.getCourses(this.messages.length)
                .subscribe((value) => {
                    var json = value.json();
                    
                    this.totalMessageCount = json['@odata.count'];
                    this.messages.push(...json.value);

                    this.isLoading = false;
                });
        }
    }

    public convert(time: Date) {
        return moment(time).from(this.refTime);
    }
}