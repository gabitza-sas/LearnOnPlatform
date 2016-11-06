import { Component, OnInit, Input } from '@angular/core';
import { NgModule } from '@angular/core';
import { Http, Response, HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import Vm = LearnOn.Controllers.Odata;
import { Headers, RequestOptions } from '@angular/http';
import { CourseService } from './CourseService';
@Component({
    selector: 'notes',
    templateUrl: '../tsScripts/notes.html'
})
export class NotesComponent {
    myPlayer: VideoJSPlayer;
    notes: Vm.NoteViewModel[];
    timeVideo: number;
    currentTimeFormatted: string;
    @Input() noteComment: string;
    courseId: number;
    interval: number;
    constructor(private _http: Http) {

    }

    ngOnInit() {
        this.myPlayer = videojs("vidRTMP");
        this.courseId = CourseService.instance.getSelectedCourse().CourseId;
        $("#noteModal").on("hidden.bs.modal", () => {
            this.onModalHide();
        });

        this.refreshNotesList();
        clearInterval(CourseService.courseInterval);
        CourseService.courseInterval = setInterval(() => this.activeNoteChecker(), 1500);
    }
    
    refreshNotesList() {
        this._http.get('/odata/Notes?$orderby=TimeSeconds&$filter=CourseId eq ' + this.courseId)
            .subscribe((response) => {
                this.notes = response.json().value;
            });
    }

    jumpTime(timeSeconds: number) {
        this.myPlayer.currentTime(timeSeconds);
        this.activeNoteChecker();
    }

    onModalHide() {
        this.myPlayer.play();
    }

    addNote() {
        this.myPlayer.pause();
        this.myPlayer.currentTime();
        this.timeVideo = this.myPlayer.currentTime();
        this.currentTimeFormatted = this.formatTime(this.timeVideo);
        this.noteComment = "";
        $('#noteModal').modal('show');
    }

    saveNote() {
        let note: Vm.NoteViewModel = {
            Id: 0,
            CourseName: "",
            CourseId: this.courseId,
            Text: this.noteComment,
            TimeSeconds: Math.floor(this.timeVideo)
        };
        let body: string = JSON.stringify(note); 
        let headers = new Headers({ 'Content-Type': 'application/json;odata=verbose' });
        let options = new RequestOptions({ headers: headers });

        this._http.post('/odata/Notes', body, options)
            .subscribe((value) => {
                $('#noteModal').modal('hide');
                this.refreshNotesList();
            });

    }

    activeNoteChecker() {
        let currentSeconds: number = this.myPlayer.currentTime();
        $(".note").each(function () {
            let seconds: number = parseInt($(this).data("time"), 10);
            if (currentSeconds < seconds + 5 && currentSeconds > seconds - 5) {
                $(this).addClass("active");
            } else {
                $(this).removeClass("active");
            }
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