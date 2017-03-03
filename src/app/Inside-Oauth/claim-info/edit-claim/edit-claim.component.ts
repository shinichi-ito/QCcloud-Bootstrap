import { Component, OnInit } from '@angular/core';
import {InsideService} from "../../Inside.service";

@Component({
  selector: 'app-edit-claim',
  templateUrl: './edit-claim.component.html',
  styleUrls: ['./edit-claim.component.css']
})
export class EditClaimComponent implements OnInit {
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
  constructor(private insideService:InsideService) {
    this.claimitem=this.insideService.claimitem;
    this.memberList=this.insideService.memberList;
    this.claimList=this.insideService.claimList
    this.taiouList=this.insideService.taiouList
  //  console.log(this.claimList)
  //  console.log(this.taiouList)





  }

  ngOnInit() {
  }
  setMember(value) {
//  console.log(this.toukousyaData);
    for (let key in this.memberList) {
      //  console.log(this.memberList[key].key)
      if (this.memberList[key].key == value) {
        this.name = this.memberList[key].name;
        this.siten = this.memberList[key].siten;
        this.busyo = this.memberList[key].busyo;
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

    for(let key in this.taiouList){
      //console.log(this.newtaiouList[key])
      if(this.taiouList[key].name==this.name&&this.taiouList[key].koukai=='kari'&&this.taiouList[key].password==this.password){
        this.newtaiouList.push(this.taiouList[key])
      }
    }



    this.OnOff=true;

  }
}
