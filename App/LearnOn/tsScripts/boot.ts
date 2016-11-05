///<reference path="./../typings/globals/core-js/index.d.ts"/>
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app';
import { ChatComponent } from './chat';
import { MyVideoComponent } from './myVideo';
import { NotesComponent } from './notes';
import { HomeComponent } from './home';

@NgModule({
    imports: [BrowserModule, HttpModule],
    declarations: [AppComponent, ChatComponent, MyVideoComponent, NotesComponent, HomeComponent],
    bootstrap: [AppComponent]
})
export class AppModule { }