import { Component, OnInit } from '@angular/core';
import {InsideService} from "../../../Inside.service";

@Component({
  selector: 'app-taisaku-list-all',
  templateUrl: './taisaku-list-all.component.html',
  styleUrls: ['./taisaku-list-all.component.css']
})
export class TaisakuListAllComponent implements OnInit {
  taisakuList:any[]=[];
  constructor(private insideService:InsideService) { }

  ngOnInit() {
    this.taisakuList=this.insideService.taisakuList

  }

}
