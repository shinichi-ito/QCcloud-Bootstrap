import { Component, OnInit } from '@angular/core';
import {InsideService} from "../../../Inside.service";

@Component({
  selector: 'app-set-image-file',
  templateUrl: './set-image-file.component.html',
  styleUrls: ['./set-image-file.component.css']
})
export class SetImageFileComponent implements OnInit {
  condition:boolean=true;
  constructor(private insideService:InsideService) { }

  ngOnInit() {
  }
  test(){
   // console.log(this.insideService.file.name)
   this.insideService.getStorageUrl()
  }
}
