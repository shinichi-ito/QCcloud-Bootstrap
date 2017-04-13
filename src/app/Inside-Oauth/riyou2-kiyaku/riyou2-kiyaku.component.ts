import { Component, OnInit } from '@angular/core';
import {OauthInfoService} from "../oauth-info.service";
import {InsideMainService} from "../inside-main.service";

@Component({
  selector: 'app-riyou2-kiyaku',
  templateUrl: './riyou2-kiyaku.component.html',
  styleUrls: ['./riyou2-kiyaku.component.css']
})
export class Riyou2KiyakuComponent implements OnInit {

  constructor(private oauthInfoService:OauthInfoService,private insideMainService:InsideMainService) { }
  logout(){
    this.oauthInfoService.check=false;//既にログインしてから一度カウントをアップしたかチェック
    this.insideMainService.logout()
  }
  ngOnInit() {
  }

}
