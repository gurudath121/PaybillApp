import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../shared.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(public ss:SharedService) { }

  ngOnInit() {
  }

  setType(type: string) {
    this.ss.filterType = type;
  }

}
