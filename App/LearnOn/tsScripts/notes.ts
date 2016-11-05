import { Component, OnInit, Input } from '@angular/core';
import { NgModule } from '@angular/core';
import { Http, Response, HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
@Component({
    selector: 'notes',
    templateUrl: '../tsScripts/notes.html'
})
export class NotesComponent {
    myPlayer: VideoJSPlayer;

    timeVideo: number;
    currentTimeFormatted: string;
    @Input() noteComment: string;
    
    constructor(private _http: Http) {

    }

    ngOnInit() {
        $('#myModal').modal('hide');
        this.myPlayer = videojs("vidRTMP");
    }

    addNote() {
        this.myPlayer.pause();
        this.myPlayer.currentTime();
        this.timeVideo = this.myPlayer.currentTime();
        this.currentTimeFormatted = this.formatTime(this.timeVideo);
        $('#noteModal').modal('show');
    }

    saveNote() {
        //let note: note
        this._http.post('/odata/Notes', "")
            .subscribe((value) => {
                alert(value);
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

    str_pad_left(string: number, pad: string, length: number): string {
        return (new Array(length + 1).join(pad) + string).slice(-length);
    }
}