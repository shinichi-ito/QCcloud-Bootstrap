import { Component, OnInit } from '@angular/core';
import {OauthInfoService} from "../oauth-info.service";
import {Subscription} from "rxjs";
import {InsideService} from "../Inside.service";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  private subscription:Subscription;
  constructor(private insideService:InsideService,private oauthInfoService:OauthInfoService) {
    this.subscription=this.insideService.busyoAdd.subscribe(value=>{
      this.insideService.busyoList.push({key:value.key,busyo:value.val().busyo,tourokusya:value.val().tourokusya,startAt:value.val().startAt})
    });
    this.subscription=this.insideService.sitenAdd.subscribe(value=>{
      this.insideService.sitenList.push({key:value.key,siten:value.val().siten,tourokusya:value.val().tourokusya,startAt:value.val().startAt})
    });

  }

  ngOnInit() {

  }
onoffHeader(){
    this.oauthInfoService.onoffHeader
}
}
