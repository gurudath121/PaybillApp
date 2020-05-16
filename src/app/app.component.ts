import { Component, OnInit } from '@angular/core';
import { NgwWowService } from 'ngx-wow';
import { AuthService } from './shared/auth.service';
declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  
  showTadaAnimation: boolean = false;
  constructor(private wowService: NgwWowService, private authService: AuthService) {
    this.wowService.init();
    this.login();
  }
  title = 'app';

  ngOnInit(): void {

  }

  hamburgerClicked(){
    this.showTadaAnimation = true;
  }

  login() {
    this.authService.Autherization();
  }

}
