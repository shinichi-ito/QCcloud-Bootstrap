import { Component, OnInit } from '@angular/core';
import {InsideService} from "../Inside.service";
import {AngularFire, FirebaseListObservable, FirebaseObjectObservable} from "angularfire2";
import {OauthInfoService} from "../oauth-info.service";

@Component({
  selector: 'app-top-inside',
  templateUrl: './top-inside.component.html',
  styleUrls: ['./top-inside.component.css']
})
export class TopInsideComponent implements OnInit {

  uid:string;
  constructor(private oauthInfoService:OauthInfoService,private af : AngularFire,private insideService:InsideService) {
    this.uid=this.oauthInfoService.uid;
  }

  ngOnInit() {


  }

}
