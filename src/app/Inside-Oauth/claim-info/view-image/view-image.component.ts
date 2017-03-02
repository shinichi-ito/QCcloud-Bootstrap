import {Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-view-image',
  templateUrl: './view-image.component.html',
  styleUrls: ['./view-image.component.css']
})
export class ViewImageComponent implements OnInit {
@Input() jyoukyouData;
  newfileList:any[]=[];
  OnOff:boolean;
  constructor() {


  }

  ngOnInit() {
  }

}
