import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {InsideService} from "../../Inside.service";
import {OauthInfoService} from "../../oauth-info.service";

@Component({
  selector: 'app-add-department',
  templateUrl: './add-department.component.html',
  styleUrls: ['./add-department.component.css']
})
export class AddDepartmentComponent implements OnInit {
tourokusya:string;
busyo:string;
  myForm: FormGroup;
  uid:string;
  busyoList:any[]=[];
  constructor(private oauthInfoService:OauthInfoService,private insideService:InsideService,private fb: FormBuilder) {
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
    this.insideService.getBusyo(this.uid).subscribe(items => {
      items.forEach(item => {
       // console.log('Item:',JSON.stringify(item));
        this.busyoList.push(item)
      });
    });



  }
Add(){
this.insideService.addBusyo(this.myForm.value,this.uid).then(data=>{
  console.log(data)
}).catch(error=>{

})
}
}
