import { Routes } from '@angular/router';
import { adminRoutes } from './features/admin/admin.routes';
import { authRoutes } from './features/auth/auth.routes';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    authRoutes,
    adminRoutes,
];
