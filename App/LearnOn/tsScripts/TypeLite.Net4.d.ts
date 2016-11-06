

 
 

 

/// <reference path="Enums.ts" />

declare module LearnOn.Controllers.Odata {
	interface ChatMessageViewModel {
		CourseId: number;
		CourseName: string;
		Id: number;
		Text: string;
		Time: Date;
		UserName: string;
	}
	interface NoteViewModel {
		CourseId: number;
		CourseName: string;
		Id: number;
		Text: string;
		TimeSeconds: number;
	}
}
declare module LearnOn.Models {
	interface Course {
		CourseId: number;
		CourseName: string;
		CourseVideo: string;
		Id: number;
	}
}


