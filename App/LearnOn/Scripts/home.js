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
var CourseService_1 = require('./CourseService');
var core_2 = require('@angular/core');
var HomeComponent = (function () {
    function HomeComponent(_http, courseService) {
        this._http = _http;
        this.courseService = courseService;
        this.coursesUrl = "/odata/Courses";
        this.showView = false;
    }
    HomeComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._http.get(this.coursesUrl)
            .subscribe(function (_) {
            _this.Courses = _.json().value;
        });
    };
    HomeComponent.prototype.onStartCourseClick = function (course) {
        CourseService_1.CourseService.getInstance().setSelectedCourse(course);
        this.showView = true;
        this.courseName = course.CourseName;
    };
    HomeComponent.prototype.startCourseAtTime = function (course, timeSeconds) {
        CourseService_1.CourseService.getInstance().setSelectedCourse(course);
        this.showView = true;
        //hackish
        var interval = setInterval(function () {
            clearInterval(interval);
            var myPlayer = videojs("vidRTMP");
            myPlayer.play();
            var intervalJump = setInterval(function () {
                clearInterval(intervalJump);
                myPlayer.currentTime(timeSeconds);
            }, 500);
        }, 1000);
    };
    HomeComponent.prototype.goBack = function () {
        this.showView = false;
        videojs("vidRTMP").dispose();
    };
    HomeComponent = __decorate([
        core_1.Component({
            selector: 'home',
            providers: [CourseService_1.CourseService],
            styles: ["[hidden]:not([broken]) { display: none !important;}"],
            templateUrl: '../tsScripts/home.html'
        }),
        core_2.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, CourseService_1.CourseService])
    ], HomeComponent);
    return HomeComponent;
}());
exports.HomeComponent = HomeComponent;
//# sourceMappingURL=home.js.map