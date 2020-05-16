import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../shared/shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  id: string = 'chart1';
  width: number = 800;
  height: number = 600;
  type: string = 'column2d';
  dataFormat: string = 'json';
  dataSource;
  loading: boolean = false;
  monthArray: any = [];
  allBillList: any = [];
  totalOnMonth: number = 0.00;
  currentDate: any;
  ratedMonth: any = [];
  expensePerYear: number = 0.00;

  constructor(public ss: SharedService, private router: Router) {
    this.dataSource = {
      "chart": {
        caption: 'Monthly Bill Expenses',
        subCaption: '',
        xAxisName: 'Months',
        yAxisName: 'Expenses(Rupees)',
        // numberSuffix: 'K',
        theme: 'fusion'
      },
      data: [
        { label: 'January', value: '0.00' },
        { label: 'February', value: '0.00' },
        { label: 'March', value: '0.00' },
        { label: 'April', value: '0.00' },
        { label: 'May', value: '0.00' },
        { label: 'June', value: '0.00' },
        { label: 'July', value: '0.00' },
        { label: 'August', value: '0.00' },
        { label: 'September', value: '0.00' },
        { label: 'October', value: '0.00' },
        { label: 'November', value: '0.00' },
        { label: 'December', value: '0.00'  }
      ]
    };
    this.currentDate = new Date();
    this.currentDate = this.currentDate.getFullYear();
  }

  ngOnInit() {
    this.loading = true;
    this.getAllPaidBills();
    this.dataSource['chart']['caption'] = 'Monthly Bill Expenses For '+this.currentDate;
  }

  getAllPaidBills() {
    this.loading = true;
    this.allBillList = [];
    this.ss.getPaidBills().subscribe( (list: any[]) => {
      if(list) {
        this.allBillList = list;
        this.allBillList.forEach(ele => {
          this.getMonth(ele['billDate']);
        });
        this.loading = false;
        console.log("array", this.monthArray);
        this.getMonthlyTotal();
      }
    },err => {
      this.loading = false;
    });
  }

  getMonth(date) {
    let getMonth = new Date(date*1000);
    this.monthArray.push(getMonth.toLocaleString('default', { month: 'long' }));
    this.monthArray =  Array.from(new Set(this.monthArray));
  }

  getMonthlyTotal(){
    let monthlyTotal = 0.00;
    this.monthArray.forEach(mArray => {
      this.calMonthTotal(mArray);
    });
    
  }

  calMonthTotal(nameOfMonth: string) {
    this.totalOnMonth = 0.00;
    let monthSortedArray = [];
    monthSortedArray = this.allBillList.filter( ele => nameOfMonth == this.ss.returnMonth(ele['billDate']));
    monthSortedArray.forEach(total => {
      this.totalOnMonth = this.totalOnMonth + total['billamount'];
    });
    this.dataSource['data'].forEach( ele => {
      if(ele['label'] == nameOfMonth){
        ele['value'] = this.totalOnMonth;
      } 
    });
    this.ratedMonth = [...this.dataSource['data']];
    this.ratedMonth = this.ratedMonth.filter(ele => ele['value'] != '0.00');
    this.ratedMonth.sort((a,b) => parseFloat(b.value) - parseFloat(a.value));
    this.expensePerYear = 0.00;
    this.ratedMonth.forEach((ele, index) => {
      ele['expensive'] = false;
      if(index == 0) {
        ele['expensive'] = true;
      }
      this.expensePerYear += ele['value'];
    });
  }

  formatize(number) {
    if (!isNaN(number)) {
      let num = number * 100;
      num = Math.round(1000 * num) / 1000;
      let res = Math.floor(num);
      let out = res / 100;
      return (number != 0 ? parseFloat(parseFloat(number.toString()).toFixed(2)) : 0.00);
    } else {
      return 0.00;
    }
  }

  navList(month:any) {
    this.loading = true;
    this.ss.filterType = 'All';
    this.ss.expensiveMonth = month;
    setTimeout(() => {
      this.loading = false;
      this.router.navigate(['/pay-bill/list']);
    }, 1000);
  }

}
