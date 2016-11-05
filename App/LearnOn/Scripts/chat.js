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
var ChatComponent = (function () {
    function ChatComponent() {
        var _this = this;
        $(function () { return _this.initialize(); });
    }
    ChatComponent.prototype.initialize = function () {
        //var chat = $.connection.chatHub;
        //chat.client.receiveMessage = this.receiveMessage.bind(this);
        //chat.server.sendMessage("Test");
    };
    ChatComponent.prototype.receiveMessage = function (message) {
        // Html encode display name and message. 
        var encodedName = $('<div />').text(name).html();
        var encodedMsg = $('<div />').text(message).html();
        // Add the message to the page. 
        $('#discussion').append('<li><strong>' + encodedName
            + '</strong>:&nbsp;&nbsp;' + encodedMsg + '</li>');
    };
    ChatComponent = __decorate([
        core_1.Component({
            selector: 'chat',
            templateUrl: '../tsScripts/chat.html'
        }), 
        __metadata('design:paramtypes', [])
    ], ChatComponent);
    return ChatComponent;
}());
exports.ChatComponent = ChatComponent;
//# sourceMappingURL=chat.js.map