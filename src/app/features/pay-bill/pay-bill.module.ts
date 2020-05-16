import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PayBillRoutingModule } from './pay-bill-routing.module';
import { EditComponent } from './edit/edit.component';
import { ListComponent } from './list/list.component';
import { CreateComponent } from './create/create.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    PayBillRoutingModule,
    FormsModule,
    SharedModule,
  ],
  declarations: [CreateComponent, EditComponent, ListComponent]
})
export class PayBillModule { }
