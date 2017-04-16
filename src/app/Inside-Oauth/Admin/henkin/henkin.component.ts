import { Component, OnInit } from '@angular/core';
import {InsideMainService} from "../../inside-main.service";

@Component({
  selector: 'app-henkin',
  templateUrl: './henkin.component.html',
  styleUrls: ['./henkin.component.css']
})
export class HenkinComponent implements OnInit {
  urlData:string;
  constructor(private insideMainService:InsideMainService) {
    this.PayJP();
  }

  ngOnInit() {
  }
  PayJP(){

    let url=this.insideMainService.url;

    let URL=url+'/henpin';

    this.urlData=URL;

  }

}
