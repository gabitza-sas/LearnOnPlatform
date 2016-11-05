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
var CourseService = (function () {
    function CourseService() {
    }
    CourseService.CreateInstance = function () {
        if (CourseService.instance == null) {
            CourseService.isCreating = true;
            CourseService.instance = new CourseService();
            CourseService.isCreating = false;
        }
    };
    CourseService.getInstance = function () {
        CourseService.CreateInstance();
        return CourseService.instance;
    };
    CourseService.prototype.setSelectedCourse = function (course) {
        this.selectedCourse = course;
    };
    CourseService.prototype.getSelectedCourse = function () {
        return this.selectedCourse;
    };
    CourseService.isCreating = false;
    CourseService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], CourseService);
    return CourseService;
}());
exports.CourseService = CourseService;
//# sourceMappingURL=CourseService.js.map