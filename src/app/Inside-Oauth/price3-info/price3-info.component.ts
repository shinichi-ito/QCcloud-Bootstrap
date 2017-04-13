import { Component, OnInit } from '@angular/core';
import {OauthInfoService} from "../oauth-info.service";
import {InsideMainService} from "../inside-main.service";

@Component({
  selector: 'app-price3-info',
  templateUrl: './price3-info.component.html',
  styleUrls: ['./price3-info.component.css']
})
export class Price3InfoComponent implements OnInit {

  constructor(private oauthInfoService:OauthInfoService,private insideMainService:InsideMainService) { }
  logout(){
    this.oauthInfoService.check=false;//既にログインしてから一度カウントをアップしたかチェック
    this.insideMainService.logout()
  }
  ngOnInit() {
  }

}
