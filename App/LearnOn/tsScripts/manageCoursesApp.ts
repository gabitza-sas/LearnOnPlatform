///<reference path="./../typings/globals/core-js/index.d.ts"/>
///<reference path="TypeLite.Net4.d.ts"/>


            
import { Component } from '@angular/core';
import { NgModule } from '@angular/core';
import { Injectable } from '@angular/core';
import { Http, Response, HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

@Component({
    selector: 'manage-courses',
    template: `    
    <h2>My favorite skill is: {{myskills}}</h2>
    <p>Skill:</p>
    <ul>
      <li *ngFor="let skl of skills">
        {{ skl }}
      </li>
    </ul>
  `
})
export class ManageCoursesComponent {
    title = 'ASP.NET MVC 5 with Angular 2';
    skills = ['MVC 5', 'Angular 2', 'TypeScript', 'Visual Studio 2015'];
    myskills = this.skills[1];
    
    constructor(private _http: Http){
        this.getOneNoty(1);
    }

    getOneNoty(id: number) {
        return this._http.get('/odata/Courses')
            .subscribe((value) => {
                alert('a');
            });
    }

}

@NgModule({
    imports: [BrowserModule, HttpModule],
    declarations: [ManageCoursesComponent],
    bootstrap: [ManageCoursesComponent]
})
export class ManageCoursesModule { }

const platform = platformBrowserDynamic();
platform.bootstrapModule(ManageCoursesModule);