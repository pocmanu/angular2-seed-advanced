// angular
import { Routes } from '@angular/router';

// app
import { HomeRoutes } from './home/home.routes';
import { AboutRoutes } from './about/about.routes';
import { ExercisesRoutes } from '../frameworks/exercises/index';

export const routes: Routes = [
  ...HomeRoutes,
  ...AboutRoutes,
  ...ExercisesRoutes
];
