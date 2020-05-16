import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from './components/nav/nav.component';
import { RouterModule } from '@angular/router';
import { CommonTableComponent } from './components/common-table/common-table.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { ToasterComponent } from './components/toaster/toaster.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [NavComponent, CommonTableComponent, SpinnerComponent, ToasterComponent],
  exports: [
    NavComponent,
    CommonTableComponent,
    SpinnerComponent,
    ToasterComponent
  ]
})
export class SharedModule {
  constructor() { }
  ngDoBootstrap() { }
}
