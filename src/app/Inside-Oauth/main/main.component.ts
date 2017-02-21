import { Component, OnInit } from '@angular/core';
import {OauthInfoService} from "../oauth-info.service";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(private oauthInfoService:OauthInfoService) { }

  ngOnInit() {
  }
onoffHeader(){
    this.oauthInfoService.onoffHeader
}
}
