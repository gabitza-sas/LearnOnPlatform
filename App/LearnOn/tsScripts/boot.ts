///<reference path="./../typings/globals/core-js/index.d.ts"/>
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app';
import { ChatComponent } from './chat';
import { MyVideoComponent } from './myVideo';
import { NotesComponent } from './notes';


@NgModule({
    imports: [BrowserModule],
    declarations: [AppComponent, ChatComponent, MyVideoComponent, NotesComponent],
    bootstrap: [AppComponent]
})
export class AppModule { }