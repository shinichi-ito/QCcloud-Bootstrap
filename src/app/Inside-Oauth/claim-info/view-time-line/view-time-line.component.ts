import { Component, OnInit } from '@angular/core';
import {InsideMainService} from "../../inside-main.service";
import {InsideService} from "../../Inside.service";

@Component({
  selector: 'app-view-time-line',
  templateUrl: './view-time-line.component.html',
  styleUrls: ['./view-time-line.component.css']
})
export class ViewTimeLineComponent implements OnInit {
  timeLineData:any[]=[];
  claimitem:any;
  constructor(private insideService:InsideService,private insideMainService:InsideMainService) {
  }

  ngOnInit() {
this.claimitem=this.insideService.claimitem;
    this.timeLineData=this.insideMainService.timelineData

  }

}
