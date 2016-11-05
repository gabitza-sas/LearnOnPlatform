
 
 

 

/// <reference path="Enums.ts" />

declare module LearnOn.Controllers.Odata {
	interface ChatMessageViewModel {
		CourseName: string;
		Id: number;
		Text: string;
		Time: Date;
		UserName: string;
	}
}
declare module LearnOn.Models {
	interface Course {
		CourseId: number;
		CourseName: string;
		Id: number;
	}
}


