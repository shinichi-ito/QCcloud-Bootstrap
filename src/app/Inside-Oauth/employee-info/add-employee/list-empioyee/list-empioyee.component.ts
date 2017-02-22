import { Component, OnInit } from '@angular/core';
import {InsideService} from "../../../Inside.service";

@Component({
  selector: 'app-list-empioyee',
  templateUrl: './list-empioyee.component.html',
  styleUrls: ['./list-empioyee.component.css']
})
export class ListEmpioyeeComponent implements OnInit {

  constructor(private insideService:InsideService) {


  }

  ngOnInit() {
  }

}
