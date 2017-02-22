import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {AngularFire} from "angularfire2";
import {OauthInfoService} from "../../../oauth-info.service";
import {InsideService} from "../../../Inside.service";

@Component({
  selector: 'app-add-depart',
  templateUrl: './add-depart.component.html',
  styleUrls: ['./add-depart.component.css']
})
export class AddDepartComponent implements OnInit {
  myForm: FormGroup;
  uid:string;
  constructor( private af : AngularFire,private oauthInfoService:OauthInfoService,private insideService:InsideService,private fb: FormBuilder) {
    this.uid=this.oauthInfoService.uid;
    this.myForm = this.fb.group({
      "tourokusya": ['',
        Validators.required
      ],
      "busyo": ['',Validators.compose([
          Validators.required
        ]
      )]
    });

  }

  ngOnInit() {
  }

  Add(){
    this.insideService.addBusyo(this.myForm.value,this.uid).then(data=>{

    }).catch(error=>{
//
    })
  }



}
