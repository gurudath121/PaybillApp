import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './features/dashboard/dashboard.component';

const routes: Routes = [
    {
        path: 'dashboard',
        component: DashboardComponent,
    },
    {
        path: 'pay-bill',
        // loadChildren: () => import('./features/pay-bill/pay-bill.module').then(mod => mod.PayBillModule) runs on JIT compiler
        loadChildren: './features/pay-bill/pay-bill.module#PayBillModule'
    },
    { 
        path: '', 
        redirectTo: '/dashboard', 
        pathMatch: 'full' 
    },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule { }