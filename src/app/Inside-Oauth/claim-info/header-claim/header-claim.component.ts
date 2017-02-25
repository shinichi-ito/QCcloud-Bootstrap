import { Component, OnInit } from '@angular/core';
import {InsideService} from "../../Inside.service";

@Component({
  selector: 'app-header-claim',
  templateUrl: './header-claim.component.html',
  styleUrls: ['./header-claim.component.css']
})
export class HeaderClaimComponent implements OnInit {
claimitem:any;
syubetu:string;
seihin:string;
gaiyou:string;
  constructor(private insideService:InsideService) {
    this.claimitem=this.insideService.claimitem
    this.syubetu=this.claimitem.syubetu
    this.seihin=this.claimitem.seihin
    this.gaiyou=this.claimitem.gaiyou
  }

  ngOnInit() {
  }

}
