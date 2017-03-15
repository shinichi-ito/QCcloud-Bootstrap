import { Component, OnInit } from '@angular/core';
import {InsideMainService} from "../../inside-main.service";
import {OauthInfoService} from "../../oauth-info.service";

@Component({
  selector: 'app-nav-sabu',
  templateUrl: './nav-sabu.component.html',
  styleUrls: ['./nav-sabu.component.css']
})
export class NavSabuComponent implements OnInit {
OnOff:boolean=true;
  constructor(private oauthInfoService:OauthInfoService) {

   this.OnOff=this.oauthInfoService.OnOff;
   // console.log(this.OnOff)
  }

  ngOnInit() {
  }

}
