import {Component, OnInit, OnDestroy} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {Router, ActivatedRoute} from "@angular/router";
import {CompanyInfoService} from "../company-info.service";
import {OauthInfoService} from "../../oauth-info.service";
import {Subscription} from "rxjs";
import {Http,Headers, RequestOptions} from "@angular/http";

@Component({
  selector: 'app-add-company-info',
  templateUrl: './add-company-info.component.html',
  styleUrls: ['./add-company-info.component.css']
})
export class AddCompanyInfoComponent implements OnInit{
  myForm: FormGroup;
  occupations:Array<any>;
  employees:Array<any>;
  companyname:string;
  daihyouname:string;
  address:string;
  tel:number;
  tantouname:string;
  email:string;
  employee:string;
  occupation:string;
  riyoukiyaku:boolean;
  privacypolicy:boolean;
uid:string;
model;
  constructor(private _http: Http,private router:Router,private fb: FormBuilder,private companyInfoService:CompanyInfoService,private oauthInfoService:OauthInfoService) {
    this.model = {
      label: ""
    };

    this.uid=this.oauthInfoService.uid;
    this.myForm = fb.group({
      "companyname": ['', Validators.required],
      "address": ['', Validators.required],
      "tel": ['', Validators.compose([Validators.required, Validators.pattern(/^\d{10}$|^\d{11}$/)])],
      "daihyouname": ['', Validators.required],
       "employee": ['',Validators.required],
      "occupation": ['',Validators.required],
      "tantouname": ['', Validators.required],
      "label": ['', Validators.required],
      "email": ['test@example.com',Validators.compose([
        Validators.required,
        Validators.pattern('[A-Za-z0-9.\-]+@[A-Za-z0-9\-]+[.][A-Za-z0-9.\-]+')])],
      "riyoukiyaku": [false,Validators.compose([Validators.required,Validators.pattern('true')])],
       "privacypolicy": [false,Validators.compose([Validators.required,Validators.pattern('true')])]

    });


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



  onAdd(){

   // console.log(this.myForm.value.label)
       this.companyInfoService.addCompanyDetail(this.myForm.value,this.uid).then((data)=>{

//this.GWOaccess()

   //    //  console.log('会社詳細情報登録成功')
       }).catch((error)=>{
    });
  }


GWOaccess(){
   // console.log(this.model.label)
  let price;
  if(this.model.label=='スタンダード'){
      price=15000;
  }else if(this.model.label=='プレミアム'){
    price=25000;
  }else if(this.model.label=='エキスパート'){
price=35000;
  }



let postUrl = '../../wp-content/themes/wp/lamp-http_server.php';
let send_data ={
    price: price,
    uid: this.uid
  };

  let headers = new Headers({ 'Content-Type': 'application/json' });
  let options = new RequestOptions({ headers: headers });
  let trans_data = JSON.stringify(send_data);
  this._http.post(postUrl, trans_data, options)
    .subscribe(
      res  => {

      },
      error => alert(error));

}
}
