import { Component, OnInit } from '@angular/core';
import {InsideService} from "../../../Inside.service";
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {OauthInfoService} from "../../../oauth-info.service";

@Component({
  selector: 'app-add-emloy',
  templateUrl: './add-emloy.component.html',
  styleUrls: ['./add-emloy.component.css']
})
export class AddEmloyComponent implements OnInit {
  busyoList:any[]=[]
  sitenList:any[]=[]
  myForm: FormGroup;
  uid:string;
  tourokusya:string;
  name:string;
  siten:string;
  busyo:string;
  constructor(private oauthInfoService:OauthInfoService,private insideService:InsideService,private fb: FormBuilder) {
    this.uid=this.oauthInfoService.uid;
    this.myForm = this.fb.group({
      "tourokusya": ['',
        Validators.required
      ],
      "name": ['',Validators.compose([
          Validators.required
        ]
      )],
      "siten": [''],
        "busyo": ['']
    });
    this.busyoList= this.insideService.busyoList
    this.sitenList= this.insideService.sitenList
  }

  ngOnInit(){

  }
  Add(){
    this.insideService.addMember(this.myForm.value,this.uid).then(data=>{

    }).catch(error=>{
//
    })
  }
}
