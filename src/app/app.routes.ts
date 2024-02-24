import { Routes } from '@angular/router';
import { EditorComponent } from './editor/feature/editor/editor.component';
import { HomeComponent } from './home/feature/home/home.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent,
  },
  {
    path: 'create',
    component: EditorComponent,
  },
];
