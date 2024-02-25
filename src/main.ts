import { bootstrapApplication } from '@angular/platform-browser';
import 'codemirror/addon/comment/comment';
import 'codemirror/addon/edit/closebrackets';
import 'codemirror/addon/edit/closetag';
import 'codemirror/addon/edit/matchbrackets';
import 'codemirror/addon/scroll/simplescrollbars';
import 'codemirror/mode/css/css';
import 'codemirror/mode/htmlembedded/htmlembedded';
import 'codemirror/mode/javascript/javascript';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

bootstrapApplication(AppComponent, appConfig).catch((err) =>
  console.error(err)
);
