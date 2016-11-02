// app
import { HomeRoutes } from './home/home.routes';
import { AboutRoutes } from './about/about.routes';
import { ExercisesRoutes } from '../frameworks/exercises/index';

export const routes: Array<any> = [
  ...HomeRoutes,
  ...AboutRoutes,
  ...ExercisesRoutes
];
