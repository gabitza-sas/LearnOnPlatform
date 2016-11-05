import { Injectable } from '@angular/core';

@Injectable()
export class CourseService  {
    private selectedCourse: LearnOn.Models.Course;

    static instance: CourseService;
    static isCreating: Boolean = false;

    constructor() {
    }

    private static CreateInstance() {
        if (CourseService.instance == null) {
            CourseService.isCreating = true;
            CourseService.instance = new CourseService();
            CourseService.isCreating = false;
        }
    }

    static getInstance() {
        CourseService.CreateInstance();

        return CourseService.instance;
    }

    public setSelectedCourse(course: LearnOn.Models.Course) {
        this.selectedCourse = course;
    }

    public getSelectedCourse(): LearnOn.Models.Course {
        return this.selectedCourse;
    }
}