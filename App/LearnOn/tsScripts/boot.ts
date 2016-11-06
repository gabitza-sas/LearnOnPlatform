///<reference path="./../typings/globals/core-js/index.d.ts"/>
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app';
import { ChatComponent } from './chat';
import { SearchNotesComponent } from './searchNotes';
import { MyVideoComponent } from './myVideo';
import { NotesComponent } from './notes';
import { HomeComponent } from './home';
import { FormsModule } from '@angular/forms';

@NgModule({
    imports: [BrowserModule, HttpModule, FormsModule],
    declarations: [AppComponent, ChatComponent, MyVideoComponent, NotesComponent, SearchNotesComponent, HomeComponent],
    bootstrap: [AppComponent]
})
export class AppModule { }