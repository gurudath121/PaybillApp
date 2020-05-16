import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { SharedService } from '../../shared.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-common-table',
  templateUrl: './common-table.component.html',
  styleUrls: ['./common-table.component.css']
})
export class CommonTableComponent implements OnInit, AfterViewInit {


  @Input() tableDetails: any = [];
  @Output() onDelete: EventEmitter<any> = new EventEmitter<any>();
  tempTableDetails: any = [];
  monthArray: any = [];
  holder: any;

  constructor(public ss: SharedService,private router: Router,private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    $('.modal').modal();
    $('.dropdown-trigger').dropdown();
    this.tableDetails.forEach( ele => {
      this.getMonth(ele['billDate']);
    });
    this.tempTableDetails = this.tableDetails;
    this.monthArray.push("Clear");
    this.ss.selectedMonth = '';
    // setTimeout(() => {
      // this.filterOnMonth(this.ss.expensiveMonth);
    // }, 1000);

  }

  getMonth(date) {
    let getMonth = new Date(date*1000);
    this.monthArray.push(getMonth.toLocaleString('default', { month: 'long' }));
    this.monthArray =  Array.from(new Set(this.monthArray));
  }

  // formatDate(date:any) {
  //   return new Date(date*1000);
  // }

  ngAfterViewInit(): void {
    $('.modal').modal();
    $('.dropdown-trigger').dropdown();
    // this.filterOnMonth(this.ss.expensiveMonth);
  }

  filterOnMonth(month:string) {
    console.log('clicked');
    this.ss.selectedMonth = month == "Clear" ? '' : month;
    this.ss.totalExpensesOnType = 0.00;
    this.tableDetails = this.tempTableDetails;
    this.tableDetails = month == "Clear" ? this.tableDetails : this.tableDetails.filter( bills => this.ss.returnMonth(bills['billDate']) == month );
    this.tableDetails.forEach( total =>{
      if(month == this.ss.returnMonth(total['billDate'])){
        this.ss.totalExpensesOnType += total['billamount'];
      }else if(month == "Clear") {
        this.ss.totalExpensesOnType += total['billamount'];
      }
    });
    console.log(this.ss.totalExpensesOnType,"subtotal");
  }

  // returnMonth(date) {
  //   let getMonth = new Date(date*1000);
  //   return getMonth.toLocaleString('default', { month: 'long' });
  // }

  delete(data:any){
    this.onDelete.emit({data});
  }

  passValue(data:any) {
    this.holder = data;
  }

  edit(data:any) {
    // const navigationExtras: NavigationExtras = { queryParams: { 'project_id': this.projectId } };
    // this.router.navigate(['/pco/create', this.deleteEle['_id']], navigationExtras);
    this.ss.filterType = data['billtype'];
    this.router.navigate(['/pay-bill/create', data['_id']]);
  }

}
