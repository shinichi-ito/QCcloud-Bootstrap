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
  constructor(private insideService:InsideService,private oauthInfoService:OauthInfoService) {}

  ngOnInit() {

  }
onoffHeader(){
    this.oauthInfoService.onoffHeader
}
}
