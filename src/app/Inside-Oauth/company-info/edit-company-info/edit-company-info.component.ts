import { Component, OnInit } from '@angular/core';
import {OauthInfoService} from "../../oauth-info.service";
import {InsideMainService} from "../../inside-main.service";
import {FirebaseObjectObservable, AngularFire} from "angularfire2";
import * as firebase from 'firebase'
@Component({
  selector: 'app-edit-company-info',
  templateUrl: './edit-company-info.component.html',
  styleUrls: ['./edit-company-info.component.css']
})
export class EditCompanyInfoComponent implements OnInit {
companyname:string;
address:string;
tel:string;
  daihyouname:string;
  occupation:string;
  employee:string;
  tantouname:string;
  email:string;
  uid:string;
  label:string;
  occupations:Array<any>;
  employees:Array<any>;
  companyB:boolean=false;
  addressB:boolean=false;
  telB:boolean=false;
  telB2:boolean=false;
  daihyounameB:boolean=false;
  occupationB:boolean=false;
  employeeB:boolean=false;
  tantounameB:boolean=false;
  emailB:boolean=false;
  emailB2:boolean=false;
  value: FirebaseObjectObservable<any>;
  model;
  constructor(private af : AngularFire,private insideMainService:InsideMainService,private oauthInfoService:OauthInfoService) {

    this.model = {
      label: ""
    };
    this.uid=this.oauthInfoService.uid;
    this.insideMainService.getCompanyInfo(this.uid).subscribe((data)=>{
        for(let key in data){
          if(data[key].$key=='companyname'){
            this.companyname=data[key].$value;
          }
          if(data[key].$key=='daihyouname'){
            this.daihyouname=data[key].$value;
          }
          if(data[key].$key=='address'){
            this.address=data[key].$value;
          }
          if(data[key].$key=='tel'){
            this.tel=data[key].$value;
          }
          if(data[key].$key=='tantouname'){
            this.tantouname=data[key].$value;
          }
          if(data[key].$key=='email'){
            this.email=data[key].$value;
          }
          if(data[key].$key=='employee'){
            this.employee=data[key].$value;
          }
          if(data[key].$key=='label'){
            console.log(data[key].$value)
            this.model.label=data[key].$value;
          }

          if(data[key].$key=='occupation'){
            this.occupation=data[key].$value;
          }
        }//forを抜けた
      },
      (error)=>{

      })




  }

  ngOnInit() {
    this.occupations = [
      {value: '0', label: '農林業'},
      {value: '1', label: '鉱業'},
      {value: '2', label: '建設業'},
      {value: '3', label: '製造業'},
      {value: '4', label: '電気業'},
      {value: '5', label: 'ガス業'},
      {value: '6', label: '運輸業'},
      {value: '7', label: '情報通信業'},
      {value: '8', label: '商業'},
      {value: '9', label: '金融業'},
      {value: '10', label: '保険業'},
      {value: '11', label: '不動産業'},
      {value: '12', label: 'サービス業'},
      {value: '13', label: '水産業'},
      {value: '14', label: 'その他'}
    ];

    this.employees = [
      {value: '0', label: '1名～10名'},
      {value: '1', label: '11名～30名'},
      {value: '2', label: '31名～50名'},
      {value: '3', label: '51名～100名'},
      {value: '4', label: '101名以上'},
    ];



  }

  upCompanyInfo(){

    if(this.companyname===''){
 this.companyB=true;
return

     }else
      this.companyB=false;
    if(this.daihyouname===''){
      this.daihyounameB=true;
return

     }else
      this.daihyounameB=false;
   if(this.address===''){
      this.addressB=true;
return

     }else
      this.addressB=false;
    if(this.tel===''){
      this.telB=true;
return

    }else
      this.telB=false;
     if(!this.tel.match(/^\d{10}$|^\d{11}$/)){
      this.telB2=true;
return
    }else
      this.telB2=false;
    if(this.tantouname===''){
      this.tantounameB=true;
return
    }else
     this.tantounameB=false;
    if(this.email===''){
      this.emailB=true;
return
     }else
      this.emailB=false;

    if(!this.email.match(/^[A-Za-z0-9]+[\w-]+@[\w\.-]+\.\w{2,}$/)){
       this.emailB2=true;
      return
    }else {
      this.emailB2 = false;
      const companyInfo = {
        companyname:this.companyname,
        daihyouname:this.daihyouname,
        address:this.address,
        tel:this.tel,
        tantouname:this.tantouname,
        email:this.email,
        employee:this.employee,
        label:this.model.label,
        occupation:this.occupation,
        updateAt: firebase.database.ServerValue.TIMESTAMP,
      };

      this.value = this.af.database.object('companyData/' + this.uid + '/companyInfo');
      this.value.update(companyInfo).then(data=>{
       // console.log('会社詳細情報編集成功')
      }).catch(error=>{
      })


    }
  }

}
