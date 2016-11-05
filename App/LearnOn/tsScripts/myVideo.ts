import { Component, OnInit } from '@angular/core';
import { CourseService } from './CourseService';

@Component({
    selector: 'my-video',
    providers: [CourseService],
    templateUrl: '../tsScripts/myVideo.html'
})
export class MyVideoComponent implements OnInit {

    myPlayer: VideoJSPlayer;

    constructor() {

    }

    ngOnInit() {
        var currentCourse = CourseService.getInstance().getSelectedCourse();
        this.myPlayer = videojs("vidRTMP", { src: currentCourse.CourseVideo }, function() { });
    }

    toggleVideo() {
        this.myPlayer.pause();
    }
}