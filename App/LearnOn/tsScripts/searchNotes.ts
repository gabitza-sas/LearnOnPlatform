import { Component, OnInit, Input } from '@angular/core';
import { NgModule } from '@angular/core';
import { Http, Response, HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import Vm = LearnOn.Controllers.Odata;
import { Headers, RequestOptions } from '@angular/http';
import { CourseService } from './CourseService';
import { HomeComponent } from './home';
@Component({
    selector: 'searchNotes',
    templateUrl: '../tsScripts/searchNotes.html'
})
export class SearchNotesComponent {
    notes: Vm.NoteViewModel[];
    constructor(private _http: Http, private _home: HomeComponent) {
    }


    ngOnInit() {
        this.refreshNotesList("");

        $("#noteComment").on("change keyup", () => {
            this.refreshNotesList($("#noteComment").val());
        });
    }
     
    jumpToCourseAtTime(courseId: number, timeSeconds: number) {
        this._http.get("/odata/Courses?$filter=CourseId eq "+courseId)
            .subscribe(_ => {
                var course = _.json().value[0];
                this._home.startCourseAtTime(course, timeSeconds);
            });
    }

    refreshNotesList(search: string) {

        this._http.get("/odata/Notes?$filter=contains(Text, '" + search+"')")
            .subscribe((response) => {
                let data = response.text();
                this.notes = JSON.parse(data).value;
            });
    }

    formatTime(seconds: number): string {
        var hours = Math.floor(seconds / 3600);
        var seconds = seconds - hours * 3600;
        var minutes = Math.floor(seconds / 60);
        var seconds = seconds - minutes * 60;
        let finalTime: string = this.str_pad_left(hours, '0', 2) + ':' +this.str_pad_left(minutes, '0', 2) + ':' + this.str_pad_left(seconds, '0', 2);
        return finalTime;
    }

    str_pad_left(num: number, pad: string, length: number): string {
        num = Math.floor(num);
        return (new Array(length + 1).join(pad) + num).slice(-length);
    }
}