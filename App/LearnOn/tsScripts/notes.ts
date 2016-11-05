import { Component, OnInit } from '@angular/core';
@Component({
    selector: 'notes',
    templateUrl: '../tsScripts/notes.html'
})
export class NotesComponent {
    myPlayer: VideoJSPlayer;

    timeVideo: number;

    ngOnInit() {
        $('#myModal').modal('hide');
        this.myPlayer = videojs("vidRTMP");
        this.timeVideo = 234;
    }

    addNote() {
        this.myPlayer.pause();
        let x: any = this.myPlayer.currentTime();
        $('#noteModal').modal('show');
    }
}

