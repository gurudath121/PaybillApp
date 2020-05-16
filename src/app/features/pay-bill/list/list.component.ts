import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { SharedService } from '../../../shared/shared.service';
import { CommonTableComponent } from 'src/app/shared/components/common-table/common-table.component';
declare var $: any;

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit, AfterViewInit {

  bills: any = [];
  loading:boolean = false;
  billsOnType: any = [];
  @ViewChild(CommonTableComponent) ct: CommonTableComponent;
  
  constructor(public ss: SharedService) { }

  ngOnInit() {
    $('.tabs').tabs();
    $('.dropdown-trigger').dropdown();
    setTimeout(() => {
      $("#sqab-info").css("display", "none");     
    }, 6000);
    this.getAllPaidLists();
  }

  ngAfterViewInit(): void {
    $('.dropdown-trigger').dropdown();
    setTimeout(() => {
      $("#sqab-info").css("display", "none");     
    }, 6000);
    $('.modal').modal();
    // this.ct.filterOnMonth(this.ss.expensiveMonth);
  }

  removeHighlighter() {

  }

  getAllPaidLists() {
    this.loading = true;
    this.ss.getPaidBills().subscribe(bills => {
      if(bills) {
        this.bills = bills;
        this.filterBillsOnType(this.bills, this.ss.filterType);
        setTimeout(()=> {
          this.loading = false;
        },1000);
      }
    },err => {
      this.loading = false;
    });
  }

  filterBillsOnType(billData:any, filter:string) {
    this.billsOnType = [];
    this.billsOnType = filter == "All" ? billData : billData.filter( bills => bills['billtype'] == filter );
    this.ss.totalExpensesOnType = 0.00;
     this.billsOnType.forEach( total =>{
      this.ss.totalExpensesOnType += total['billamount'];
    });
    // this.ct.filterOnMonth(this.ss.expensiveMonth);
  }

  setFilterType(type:string) {
    this.ss.filterType = type;
    this.filterBillsOnType(this.bills, this.ss.filterType);
    setTimeout(() => {
      $("#sqab-info").css("display", "none");     
    }, 6000);
  }

  deleteBills(data) {
    // $('#confirmModal').css('display', 'block');
    this.loading = true;
    this.ss.deleteABill(data.data['_id']).subscribe( onDelete => {
      if(onDelete){
        // this.ss.launch_toast(this.ss.filterType+" Bill Deleted Successfully");
        this.ss.launch_toast(this.ss.filterType+" "+this.ss.t_msg_delete);
        setTimeout(() => {
          this.getAllPaidLists();
          this.loading = false;
        }, 1000);

      }
    }, err => {
      this.loading = false;
      this.getAllPaidLists();
    });
  }

}
