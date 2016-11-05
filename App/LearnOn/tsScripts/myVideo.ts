import { Component, OnInit } from '@angular/core';
@Component({
    selector: 'my-video',
    templateUrl: '../tsScripts/myVideo.html'
})
export class MyVideoComponent {

    myPlayer: VideoJSPlayer;

    ngOnInit() {
        this.myPlayer = videojs("vidRTMP");
    }

    toggleVideo() {
        this.myPlayer.pause();
    }
}