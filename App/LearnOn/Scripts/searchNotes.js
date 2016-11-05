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
var home_1 = require('./home');
var SearchNotesComponent = (function () {
    function SearchNotesComponent(_http, _home) {
        this._http = _http;
        this._home = _home;
    }
    SearchNotesComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.refreshNotesList("");
        $("#noteComment").on("change keyup", function () {
            _this.refreshNotesList($("#noteComment").val());
        });
    };
    SearchNotesComponent.prototype.jumpToCourseAtTime = function (courseId, timeSeconds) {
        var _this = this;
        this._http.get("/odata/Courses?$filter=CourseId eq " + courseId)
            .subscribe(function (_) {
            var course = _.json().value[0];
            _this._home.startCourseAtTime(course, timeSeconds);
        });
    };
    SearchNotesComponent.prototype.refreshNotesList = function (search) {
        var _this = this;
        this._http.get("/odata/Notes?$filter=contains(Text, '" + search + "')")
            .subscribe(function (response) {
            var data = response.text();
            _this.notes = JSON.parse(data).value;
        });
    };
    SearchNotesComponent.prototype.formatTime = function (seconds) {
        var hours = Math.floor(seconds / 3600);
        var seconds = seconds - hours * 3600;
        var minutes = Math.floor(seconds / 60);
        var seconds = seconds - minutes * 60;
        var finalTime = this.str_pad_left(hours, '0', 2) + ':' + this.str_pad_left(minutes, '0', 2) + ':' + this.str_pad_left(seconds, '0', 2);
        return finalTime;
    };
    SearchNotesComponent.prototype.str_pad_left = function (num, pad, length) {
        num = Math.floor(num);
        return (new Array(length + 1).join(pad) + num).slice(-length);
    };
    SearchNotesComponent = __decorate([
        core_1.Component({
            selector: 'searchNotes',
            templateUrl: '../tsScripts/searchNotes.html'
        }), 
        __metadata('design:paramtypes', [http_1.Http, home_1.HomeComponent])
    ], SearchNotesComponent);
    return SearchNotesComponent;
}());
exports.SearchNotesComponent = SearchNotesComponent;
//# sourceMappingURL=searchNotes.js.map