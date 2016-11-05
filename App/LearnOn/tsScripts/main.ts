import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { CourseService } from './CourseService';
import { AppModule } from './boot';

platformBrowserDynamic().bootstrapModule(AppModule, { providers: [CourseService] });