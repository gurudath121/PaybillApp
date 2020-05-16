import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { ListComponent } from './list/list.component';

const routes: Routes = [
  {
    path: 'create',
    component: CreateComponent,
    data: {title: 'Create'}
  },
  {
    path: 'create/:pb_ID',
    component: CreateComponent,
    data: {title: 'Edit'}
  },
  {
    path: 'view',
    component: EditComponent,
    data: {title: 'View'}
  },
  {
    path: 'list',
    component: ListComponent,
    data: {title: 'List'}
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PayBillRoutingModule { }
