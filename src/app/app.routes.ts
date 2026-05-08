import { Routes } from '@angular/router';
import { Punto1 } from './components/punto1/punto1';

export const routes: Routes = [
    { path: '', redirectTo: '/punto1', pathMatch: 'full' }, // Para que arranque directo ahí
    { path: 'punto1', component: Punto1   }
];
