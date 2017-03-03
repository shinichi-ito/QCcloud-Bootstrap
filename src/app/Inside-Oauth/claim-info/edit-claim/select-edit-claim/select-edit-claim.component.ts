import { Component, OnInit } from '@angular/core';
import {InsideService} from "../../../Inside.service";
import {Router} from "@angular/router";
import {InsideMainService} from "../../../inside-main.service";

@Component({
  selector: 'app-select-edit-claim',
  templateUrl: './select-edit-claim.component.html',
  styleUrls: ['./select-edit-claim.component.css']
})
export class SelectEditClaimComponent implements OnInit {

  memberList:any[]=[];
  name:string;
  siten:string;
  busyo:string;
  claimList:any[]=[];
  newclaimList:any[]=[];
  taiouList:any[]=[];
  newtaiouList:any[]=[];
  password:string;
  OnOff:boolean=false;
  claimitem:any;
  claimData:any;
  constructor(private insideMainService:InsideMainService,private router: Router,private insideService:InsideService) {
    this.claimitem=this.insideService.claimitem;
    this.memberList=this.insideService.memberList;
    this.claimList=this.insideService.claimList

  }

  ngOnInit() {
  }
  setMember(value) {
    for (let key in this.memberList) {
      if (this.memberList[key].key == value) {
        this.name = this.memberList[key].name;
      }
    }
  }


  getData(){
//console.log(this.claimList)

    for(let key in this.claimList){
      if(this.claimList[key].name==this.name&&this.claimList[key].koukai=='kari'&&this.claimList[key].password==this.password){
        this.newclaimList.push(this.claimList[key])
      }
    }

    this.OnOff=true;

  }


  setEdit(idx){
    this.claimData=this.newclaimList[idx];
    this.insideMainService.claimData=this.claimData;
    this.router.navigate(['/main/editclaim/changeclaim'])


  }



}
