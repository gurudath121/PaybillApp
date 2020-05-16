import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
declare var $: any;

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  billType: any = [];
  url: string = 'http://localhost:3000/bills';
  filterType: string = 'Electricity';
  totalExpensesOnType: number = 0.00;
  selectedMonth:any = '';
  t_msg_create: string = '';
  t_msg_update: string = '';
  t_msg_delete: string = '';
  expensiveMonth: string = '';
  constructor(private http: HttpClient) {
    this.billType = [{
      "name": "Electricity",
      "value": "Electricity"
    },
    {
      "name": "Water",
      "value": "Water"
    },
    {
      "name": "Gas",
      "value": "Gas"
    },
    {
      "name": "DTH",
      "value": "DTH"
    },
    {
      "name": "Phone/Internet",
      "value": "Phone/Internet"
    },
    {
      "name": "Food/Grocery",
      "value": "Food/Grocery"
    },
    {
      "name": "Loan/Insurance/Mutual Funds",
      "value": "Loan/Insurance"
    },
    {
      "name": "Online Purchase",
      "value": "Online Purchase"
    },
    {
      "name": "Money Transfer",
      "value": "Money Transfer"
    },
    {
      "name": "Others",
      "value": "Others"
    }];

    this.t_msg_create = "Bill Created Successfully";
    this.t_msg_update = "Bill Updated Successfully";
    this.t_msg_delete = "Bill Deleted Successfully";
   }

   returnMonth(date) {
    let getMonth = new Date(date*1000);
    return getMonth.toLocaleString('default', { month: 'long' });
  }

  formatDate(date:any) {
    return new Date(date*1000);
  }

  launch_toast(message) {
    let txt = message;
    // $('#toast').addClass('show');
    $("#toast").toggleClass('show',true);
    $('div#desc').text(txt);
    setTimeout(()=> {
      $("#toast").toggleClass('show',false);
    },5000);
  }

  //  Each components API calls goes here....
  getPaidBills() {
    return this.http.get(this.url+'/list');
  }

  createAnBill(payload:any) {
    return this.http.post(this.url+'/create', payload);
  } 

  deleteABill(billId:string) {
    return this.http.delete(this.url+'/'+billId);
  }

  getPayDetailsOnId(billId:string) {
    return this.http.get(this.url+'/'+billId);
  }

  updateABill(billId: string, payload:any) {
    return this.http.put(this.url+'/'+billId, payload);
  }

}
