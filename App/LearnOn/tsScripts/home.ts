import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

@Component({
    selector: 'home',
    templateUrl: '../tsScripts/home.html'
})
export class HomeComponent {

    coursesUrl = "/odata/Courses"

    Courses: Array<LearnOn.Models.Course>;

    constructor(private _http: Http) {
    }



    ngOnInit() {
        this._http.get(this.coursesUrl)
            .subscribe(_ => {
                alert("a");
            });
    }
}