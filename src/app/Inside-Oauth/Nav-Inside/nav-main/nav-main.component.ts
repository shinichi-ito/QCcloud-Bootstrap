import { Component, OnInit } from '@angular/core';
import {OauthInfoService} from "../../oauth-info.service";
import {InsideMainService} from "../../inside-main.service";

@Component({
  selector: 'app-nav-main',
  templateUrl: './nav-main.component.html',
  styleUrls: ['./nav-main.component.css']
})
export class NavMainComponent implements OnInit {
url:string;
  constructor(private oauthInfoService:OauthInfoService,private insideMainService:InsideMainService) {

this.url=this.insideMainService.url;

  }

  ngOnInit() {
  }
logout(){
  this.oauthInfoService.check=false;//既にログインしてから一度カウントをアップしたかチェック
   this.insideMainService.logout()
}
}
