import { Routes } from '@angular/router';
import { EditorContainerComponent } from './editor/feature/main-editor/feature/editor-container/editor-container.component';
import { SavedEditorContainerComponent } from './editor/feature/saved-code-editor/feature/saved-editor-container/saved-editor-container.component';
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
  {
    path: 'saved/:id',
    component: SavedEditorContainerComponent,
  },
];
