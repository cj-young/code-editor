import { Routes } from '@angular/router';
import { HomeComponent } from './home/feature/home/home.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent,
  },
];
