import {provideRouter, RouterConfig} from '@angular/router';

import {AboutRoutes} from '../about/about.routes';
import {HomeRoutes} from '../home/home.routes';
import {TodosRoutes} from '../todo/todos.routes';
import {CalendarRoutes} from '../calendar/calendar.routes';
import {CounterRoutes} from '../counter/counter.routes';

export const routes: RouterConfig = [
  ...HomeRoutes,
  ...AboutRoutes,
  ...TodosRoutes,
  ...CalendarRoutes,
  ...CounterRoutes
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
];
