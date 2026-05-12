import { Routes } from '@angular/router';
import { Punto1 } from './components/punto1/punto1';
import { Punto2 } from './components/punto2/punto2';
import { Punto3 } from './components/punto3/punto3';
import { Punto4 } from './components/punto4/punto4';

export const routes: Routes = [
    { path: '', redirectTo: '/punto1', pathMatch: 'full' }, // Para que arranque directo ahí
    { path: 'punto1', component: Punto1   },
    { path: 'punto2', component: Punto2   },
    { path: 'punto3', component: Punto3   },
    { path: 'punto4', component: Punto4   }
];