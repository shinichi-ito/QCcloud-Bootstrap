import { Component, OnInit } from '@angular/core';
import {OauthInfoService} from "../../oauth-info.service";

@Component({
  selector: 'app-top-claim',
  templateUrl: './top-claim.component.html',
  styleUrls: ['./top-claim.component.css']
})
export class TopClaimComponent implements OnInit {
  onoffHeader:boolean=false;
  constructor(private oauthInfoService:OauthInfoService) {
    this.onoffHeader=this.oauthInfoService.onoffHeader;
  }

  ngOnInit() {
  }
setOnHeader(){
    this.onoffHeader=true;
}
  setOffHeader(){
    this.onoffHeader=false;
  }
}
