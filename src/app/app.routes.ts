import { Routes } from '@angular/router';
import { EditorContainerComponent } from './editor/feature/editor-container/editor-container.component';
import { HomeComponent } from './home/feature/home/home.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent,
  },
  {
    path: 'create',
    component: EditorContainerComponent,
  },
];
