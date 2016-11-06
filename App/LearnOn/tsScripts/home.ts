import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { NgIf } from '@angular/common';
import { CourseService } from './CourseService';
import { Injectable } from '@angular/core';

@Component({
    selector: 'home',
    providers: [CourseService],
    styles: [`[hidden]:not([broken]) { display: none !important;}`],
    templateUrl: '../tsScripts/home.html'
})

@Injectable()
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

    startCourseAtTime(course: LearnOn.Models.Course, timeSeconds:number): void {
        CourseService.getInstance().setSelectedCourse(course);
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
        
    }



    goBack() {
        this.showView = false;
        videojs("vidRTMP").dispose();
    }
}