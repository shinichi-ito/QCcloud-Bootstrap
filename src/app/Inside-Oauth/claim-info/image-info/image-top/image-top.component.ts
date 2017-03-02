import { Component, OnInit } from '@angular/core';
import {InsideService} from "../../../Inside.service";

@Component({
  selector: 'app-image-top',
  templateUrl: './image-top.component.html',
  styleUrls: ['./image-top.component.css']
})
export class ImageTopComponent implements OnInit {
  InfoData:any[]=[];
  name:string;
  toukousya:string;
  siten:string;
  busyo:string;
  naiyou:string;
  constructor(private insideService:InsideService) {



   // console.log(this.insideService.InfoData[0].toukousya)
  }

  ngOnInit() {

    this.InfoData= this.insideService.InfoData;
    this.toukousya=this.InfoData[0].toukousya;
    this.naiyou=this.InfoData[0].naiyou;

  }

}
