import { Component, OnInit } from '@angular/core';
import {InsideService} from "../../../Inside.service";

@Component({
  selector: 'app-kouka-list-all',
  templateUrl: './kouka-list-all.component.html',
  styleUrls: ['./kouka-list-all.component.css']
})
export class KoukaListAllComponent implements OnInit {
  koukaList:any[]=[];
  constructor(private insideService:InsideService) { }

  ngOnInit() {
    this.koukaList=this.insideService.koukaList
  }

}
