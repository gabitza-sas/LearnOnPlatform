/// <reference path="..\typings\globals\jquery\index.d.ts" />
/// <reference path="..\typings\globals\signalr\index.d.ts" />
/// <reference path="signalr.server.d.ts" />
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var ChatComponent = (function () {
    function ChatComponent(http) {
        var _this = this;
        this.http = http;
        this.messages = [];
        this.newMessage = "";
        this.courseId = 1;
        $(function () { return _this.initialize(); });
    }
    ChatComponent.prototype.initialize = function () {
        var _this = this;
        var chat = $.connection.chatHub;
        chat.client.receiveMessage = this.receiveMessage.bind(this);
        this.server = chat.server;
        $.connection.hub.start()
            .then(function () {
            chat.server.joinCourse(_this.courseId);
            chat.server.sendMessage("Test");
        });
    };
    ChatComponent.prototype.getCourses = function () {
        var _this = this;
        return this.http.get("/odata/ChatMessages/$filter=CourseId eq " + this.courseId)
            .subscribe(function (value) {
            _this.messages = value.json().value;
        });
    };
    ChatComponent.prototype.receiveMessage = function (message) {
        this.messages.push(message);
    };
    ChatComponent.prototype.sendMessage = function () {
        this.server.sendMessage(this.newMessage);
        this.newMessage = "";
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], ChatComponent.prototype, "newMessage", void 0);
    ChatComponent = __decorate([
        core_1.Component({
            selector: 'chat',
            templateUrl: '../tsScripts/chat.html'
        }), 
        __metadata('design:paramtypes', [http_1.Http])
    ], ChatComponent);
    return ChatComponent;
}());
exports.ChatComponent = ChatComponent;
//# sourceMappingURL=chat.js.map