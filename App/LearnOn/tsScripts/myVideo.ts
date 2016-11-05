import { Component, OnInit } from '@angular/core';
@Component({
    selector: 'my-video',
    templateUrl: '../tsScripts/myVideo.html'
})
export class MyVideoComponent implements OnInit {

    myPlayer: VideoJSPlayer;

    ngOnInit() {
        
        this.myPlayer = videojs("vidRTMP", {}, function () { });
    }

    toggleVideo() {
        this.myPlayer.pause();
    }
}