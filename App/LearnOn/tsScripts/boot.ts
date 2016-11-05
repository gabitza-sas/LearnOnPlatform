///<reference path="./../typings/globals/core-js/index.d.ts"/>
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app';
import { ChatComponent } from './chat';
import { MyVideoComponent } from './myVideo';
import { NotesComponent } from './notes';
import { FormsModule } from '@angular/forms';

@NgModule({
    imports: [BrowserModule, FormsModule],
    declarations: [AppComponent, ChatComponent, MyVideoComponent, NotesComponent],
    bootstrap: [AppComponent]
})
export class AppModule { }