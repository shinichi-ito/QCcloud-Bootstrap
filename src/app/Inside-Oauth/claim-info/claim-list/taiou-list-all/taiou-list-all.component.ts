import { Component, OnInit } from '@angular/core';
import {InsideService} from "../../../Inside.service";

@Component({
  selector: 'app-taiou-list-all',
  templateUrl: './taiou-list-all.component.html',
  styleUrls: ['./taiou-list-all.component.css']
})
export class TaiouListAllComponent implements OnInit {
  taiouList:any[]=[];
  constructor(private insideService:InsideService) { }

  ngOnInit() {
    this.taiouList=this.insideService.taiouList
  }

}
