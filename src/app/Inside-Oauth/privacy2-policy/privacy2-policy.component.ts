import { Component, OnInit } from '@angular/core';
import {OauthInfoService} from "../oauth-info.service";
import {InsideMainService} from "../inside-main.service";

@Component({
  selector: 'app-privacy2-policy',
  templateUrl: './privacy2-policy.component.html',
  styleUrls: ['./privacy2-policy.component.css']
})
export class Privacy2PolicyComponent implements OnInit {

  constructor(private oauthInfoService:OauthInfoService,private insideMainService:InsideMainService) { }
  logout(){
    this.oauthInfoService.check=false;//既にログインしてから一度カウントをアップしたかチェック
    this.insideMainService.logout()
  }
  ngOnInit() {
  }

}
