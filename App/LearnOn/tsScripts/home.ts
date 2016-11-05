import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { NgIf } from '@angular/common';
import { CourseService } from './CourseService';

@Component({
    selector: 'home',
    providers: [CourseService],
    styles: [`[hidden]:not([broken]) { display: none !important;}`],
    templateUrl: '../tsScripts/home.html'
})
export class HomeComponent {

    coursesUrl = "/odata/Courses"

    Courses: Array<LearnOn.Models.Course>;

    showView: boolean = false;

    myPlayer: VideoJSPlayer;

    courseName: string;

    constructor(private _http: Http, private courseService: CourseService) {
    }

    ngOnInit() {
        this._http.get(this.coursesUrl)
            .subscribe(_ => {
                this.Courses = _.json().value;
            });
    }

    onStartCourseClick(course: LearnOn.Models.Course): void {
        CourseService.getInstance().setSelectedCourse(course);
        this.showView = true;
        this.courseName = course.CourseName;
    }

    goBack() {
        this.showView = false;
        videojs("vidRTMP").dispose();
    }
}