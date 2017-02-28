import { Component, OnInit } from '@angular/core';
import {InsideService} from "../../../Inside.service";

@Component({
  selector: 'app-genin-list-all',
  templateUrl: './genin-list-all.component.html',
  styleUrls: ['./genin-list-all.component.css']
})
export class GeninListAllComponent implements OnInit {
  geninList:any[]=[];
  constructor(private insideService:InsideService) { }

  ngOnInit() {
    this.geninList=this.insideService.geninList
  }

}
