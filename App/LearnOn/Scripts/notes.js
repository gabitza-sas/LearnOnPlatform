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
var http_2 = require('@angular/http');
var CourseService_1 = require('./CourseService');
var NotesComponent = (function () {
    function NotesComponent(_http) {
        this._http = _http;
    }
    NotesComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.myPlayer = videojs("vidRTMP");
        this.courseId = CourseService_1.CourseService.instance.getSelectedCourse().CourseId;
        $("#noteModal").on("hidden.bs.modal", function () {
            _this.onModalHide();
        });
        this.refreshNotesList();
        clearInterval(CourseService_1.CourseService.courseInterval);
        CourseService_1.CourseService.courseInterval = setInterval(function () { return _this.activeNoteChecker(); }, 1500);
    };
    NotesComponent.prototype.refreshNotesList = function () {
        var _this = this;
        this._http.get('/odata/Notes?$orderby=TimeSeconds&$filter=CourseId eq ' + this.courseId)
            .subscribe(function (response) {
            _this.notes = response.json().value;
        });
    };
    NotesComponent.prototype.jumpTime = function (timeSeconds) {
        this.myPlayer.currentTime(timeSeconds);
    };
    NotesComponent.prototype.onModalHide = function () {
        this.myPlayer.play();
    };
    NotesComponent.prototype.addNote = function () {
        this.myPlayer.pause();
        this.myPlayer.currentTime();
        this.timeVideo = this.myPlayer.currentTime();
        this.currentTimeFormatted = this.formatTime(this.timeVideo);
        this.noteComment = "";
        $('#noteModal').modal('show');
    };
    NotesComponent.prototype.saveNote = function () {
        var _this = this;
        var note = {
            Id: 0,
            CourseName: "",
            CourseId: this.courseId,
            Text: this.noteComment,
            TimeSeconds: Math.floor(this.timeVideo)
        };
        var body = JSON.stringify(note);
        var headers = new http_2.Headers({ 'Content-Type': 'application/json;odata=verbose' });
        var options = new http_2.RequestOptions({ headers: headers });
        this._http.post('/odata/Notes', body, options)
            .subscribe(function (value) {
            $('#noteModal').modal('hide');
            _this.refreshNotesList();
        });
    };
    NotesComponent.prototype.activeNoteChecker = function () {
        var currentSeconds = this.myPlayer.currentTime();
        $(".note").each(function () {
            var seconds = parseInt($(this).data("time"), 10);
            if (currentSeconds < seconds + 5 && currentSeconds > seconds - 5) {
                $(this).addClass("active");
            }
            else {
                $(this).removeClass("active");
            }
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
    NotesComponent.prototype.str_pad_left = function (num, pad, length) {
        num = Math.floor(num);
        return (new Array(length + 1).join(pad) + num).slice(-length);
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