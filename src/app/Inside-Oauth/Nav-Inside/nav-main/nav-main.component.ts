import { Component, OnInit } from '@angular/core';
import {OauthInfoService} from "../../oauth-info.service";
import {InsideMainService} from "../../inside-main.service";

@Component({
  selector: 'app-nav-main',
  templateUrl: './nav-main.component.html',
  styleUrls: ['./nav-main.component.css']
})
export class NavMainComponent implements OnInit {

  constructor(private insideMainService:InsideMainService) {



  }

  ngOnInit() {
  }
logout(){
   this.insideMainService.logout()
}
}
