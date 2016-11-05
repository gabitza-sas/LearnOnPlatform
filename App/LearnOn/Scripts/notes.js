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
var NotesComponent = (function () {
    function NotesComponent(_http) {
        this._http = _http;
    }
    NotesComponent.prototype.ngOnInit = function () {
        $('#myModal').modal('hide');
        this.myPlayer = videojs("vidRTMP");
    };
    NotesComponent.prototype.addNote = function () {
        this.myPlayer.pause();
        this.myPlayer.currentTime();
        this.timeVideo = this.myPlayer.currentTime();
        this.currentTimeFormatted = this.formatTime(this.timeVideo);
        $('#noteModal').modal('show');
    };
    NotesComponent.prototype.saveNote = function () {
        //let note: note
        this._http.post('/odata/Notes/post', "")
            .subscribe(function (value) {
            alert(value);
        });
    };
    NotesComponent.prototype.formatTime = function (seconds) {
        var hours = Math.floor(seconds / 3600);
        var seconds = seconds - hours * 3600;
        var minutes = Math.floor(seconds / 60);
        var seconds = seconds - minutes * 60;
        var finalTime = this.str_pad_left(hours, '0', 2) + ':' + this.str_pad_left(minutes, '0', 2) + ':' + this.str_pad_left(seconds, '0', 2);
        return finalTime;
    };
    NotesComponent.prototype.str_pad_left = function (string, pad, length) {
        return (new Array(length + 1).join(pad) + string).slice(-length);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], NotesComponent.prototype, "noteComment", void 0);
    NotesComponent = __decorate([
        core_1.Component({
            selector: 'notes',
            templateUrl: '../tsScripts/notes.html'
        }), 
        __metadata('design:paramtypes', [http_1.Http])
    ], NotesComponent);
    return NotesComponent;
}());
exports.NotesComponent = NotesComponent;
//# sourceMappingURL=notes.js.map