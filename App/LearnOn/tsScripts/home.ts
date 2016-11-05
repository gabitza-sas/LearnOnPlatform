import { Component, OnInit, NgZone } from '@angular/core';
import { Http } from '@angular/http';
import { NgIf } from '@angular/common'

@Component({
    selector: 'home',
    styles: [`[hidden]:not([broken]) { display: none !important;}`],
    templateUrl: '../tsScripts/home.html'
})
export class HomeComponent {

    coursesUrl = "/odata/Courses"

    Courses: Array<LearnOn.Models.Course>;

    showView: boolean = false;

    myPlayer: VideoJSPlayer;

    constructor(private _http: Http, private _ngZone: NgZone) {
    }

    ngOnInit() {
        this._http.get(this.coursesUrl)
            .subscribe(_ => {
                this.Courses = _.json().value;
            });
    }

    onStartCourseClick(course: LearnOn.Models.Course): void {
        this.showView = true;
    }

    goBack() {
        this.showView = false;
        videojs("vidRTMP").dispose();
    }
}