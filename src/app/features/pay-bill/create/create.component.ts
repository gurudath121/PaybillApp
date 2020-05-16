import { Component, OnInit, AfterViewInit } from '@angular/core';
declare var $: any;
import { Bills } from '../../../shared/model/Bills';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { SharedService } from '../../../shared/shared.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit, AfterViewInit {

  bills: Bills;

  model: any = {};
  loading: boolean = false;
  URLParams: any = {};
  isEdit: boolean = false;
  dateHolder: any;
  // picker:any;
  constructor(private router: Router, public ss: SharedService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    $('select').formSelect();
    $('.dropdown-trigger').dropdown();
    this.activatedRoute.params.subscribe((param: Params) => {
      if (param && param['pb_ID']) {
        this.URLParams['pb_ID'] = param['pb_ID'];
        this.isEdit = true;
      }
    });
    this.bills = {
      billname: '',
      billamount: 0.00,
      billdesc: '',
      billdate: 0,
      selectedType: ''
    };
    if (this.isEdit) {
      this.getBillDetailsOnId();
    }
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      $('select').formSelect();
      $('.datepicker').datepicker();
      $('.tooltipped').tooltip();
      $('input#bill_name, textarea#description').characterCounter();
      $('.dropdown-trigger').dropdown();
    }, 1000);
  }

  onChange(e) {
    console.log(this.bills.selectedType);
  }

  onDateChange(e) {
    let date = new Date(e.target.value);
    this.bills.billdate = Math.floor(date.getTime() / 1000.0);
    console.log(this.bills.billdate); // convert into epoch date
  }

  onBillAmountChange(e) {
    this.bills.billamount = Number(e.target.value);
  }

  onNameChange(e) {
    this.bills.billname = e.target.value;
  }

  onSubmit() {
    this.loading = true;
    if (!this.bills.billname || !this.bills.selectedType || !this.bills.billamount || !this.bills.billdate) {
      this.loading = false;
      alert("Please fill out all mandatory details & continue...!!!!");
    } else {
      if (this.isEdit) {
        this.ss.updateABill(this.URLParams['pb_ID'], this.bills).subscribe(update => {
          if(update){
            this.ss.filterType = this.bills['selectedType'];
            this.ss.launch_toast(this.ss.filterType +" "+this.ss.t_msg_update);
            setTimeout(() => {
              this.loading = false;
              this.router.navigate(['/pay-bill/list']);
            }, 3000);
          }
        }, err => {
          this.loading = false;
        });
      } else {
        this.ss.createAnBill(this.bills).subscribe(create => {
          if (create) {
            this.ss.filterType = this.bills['selectedType'];
            this.ss.launch_toast(this.ss.filterType+ " " +this.ss.t_msg_create);
            setTimeout(() => {
              this.loading = false;
              this.router.navigate(['/pay-bill/list']);
            }, 3000);
          }
        });
      }
    }
  }

  onCancel() {
    this.ss.filterType = "Electricity";
    this.router.navigate(['/pay-bill/list']);
  }

  getBillDetailsOnId() {
    this.loading = true;
    this.ss.getPayDetailsOnId(this.URLParams['pb_ID']).subscribe(bills => {
      if (bills) {
        this.bills['billname'] = bills['billname'];
        this.bills['selectedType'] = bills['billtype'];
        this.bills['billamount'] = bills['billamount'];
        this.bills['billdate'] = bills['billDate'];
        this.bills['billdesc'] = bills['billdesc'];
        this.loading = false;
      }
      this.dateHolder = this.ss.formatDate(this.bills['billdate']);
    }, err => {
      this.loading = false;
    });
  }

}
