import {Component, OnInit, OnDestroy, ViewChild} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {Router, ActivatedRoute} from "@angular/router";
import {CompanyInfoService} from "../company-info.service";
import {OauthInfoService} from "../../oauth-info.service";
import {Subscription} from "rxjs";
import {Http,Headers, RequestOptions} from "@angular/http";
import {ErrorDialogComponent} from "../../Dialog/error-dialog/error-dialog.component";
import {ProgressDialogComponent} from "../../Dialog/progress-dialog/progress-dialog.component";
import {AddCardComponent} from "../../Dialog/add-card/add-card.component";
import {Md5} from 'ts-md5/dist/md5';
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

@ViewChild("errorDialog") errorDialogComponent: ErrorDialogComponent;
   errorData:string;
   @ViewChild("progrssDialog") progressDialogComponent: ProgressDialogComponent;
   Data:string;
  @ViewChild("cardDialog") cardDialogComponent: AddCardComponent;
  urlData:string;
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
    this.Data="";
    this.progressDialogComponent.openDialog();
      this.companyInfoService.addCompanyDetail(this.myForm.value,this.uid).then((data)=>{//ここではまだtermは変更しない　0のまま。カード登録が終わったらtermを1にする
//会社情報の登録が完了したらカード登録画面へ
//this.GWOaccess()
     //   this.router.navigate(['/main/topinside'])
        this.progressDialogComponent.closeDialog();
        this.GmoURL();
        this.cardDialogComponent.openDialog();
     }).catch((error)=>{
        this.progressDialogComponent.closeDialog();
        this.errorData=error.message;
        this.errorDialogComponent.openDialog();



    });
  }

  GmoURL(){
    let priceData;
  if(this.model.label=='スタンダード'){
      priceData=25000;
  }else if(this.model.label=='プレミアム'){
    priceData=30000;
  }else if(this.model.label=='エキスパート'){
 priceData=35000;
   }

    let url='/link/(弊社指定の ID)/Multi/Entry?';
    let shopID='testshop';
    let orderID='order001';
    let plice=priceData;
    let shoppassword=this.shopInfo();
    let date=this.formatDate(new Date(),'YYYYMMDDhhmmss');
    let uid=this.uid;

    let URL=url+ 'ShopID='+shopID+'&OrderID='+orderID+'&Amount='+plice
      +'&DataTime='+date+'&ShopPassString='+shoppassword+
      '&RetURL=http://localhost:4200/success'+
      '&CancelURL=http://localhost:4200/cancel'+'&ClientField1='+uid;//ClientField1は弊社自由に使用できる

   // console.log(URL)
this.urlData=URL;
  }



//   ショップ ID＝testshop   オーダーID＝order001   利用金額＝1000   税送料＝80   ショップパスワード＝abcdefgh   日時情報＝20080401092355
//
// ■税送料を送信する場合 ショップ情報確認文字列＝「”testshop|order001|1000|80|abcdefgh|20080401092355” をＭＤ５でハッシュした値」
//
// ■税送料を送信しない場合 ショップ情報確認文字列＝「”testshop|order001|1000||abcdefgh|20080401092355” をＭＤ５でハッシュした値」
  shopInfo(){//税抜きで作成
    let shopID='testshop';
    let orderID='order001';
    let plice=15000;
    let shoppassword='abcdefgh';
    let date=this.formatDate(new Date(),'YYYYMMDDhhmmss');

    //console.log(shopID+'|'+orderID+'|'+plice+'|'+shoppassword+'|'+date);
    //console.log(Md5.hashStr("foo"));
    // console.log(Md5.hashStr(shopID+'|'+orderID+'|'+plice+'|'+shoppassword+'|'+date));
    return Md5.hashStr(shopID+'|'+orderID+'|'+plice+'|'+shoppassword+'|'+date);
  }


//指定の日付フォーマットで表示
  formatDate(date, format) {//console.log(this.formatDate(new Date(),'YYYYMMDDhhmmss'));表示は20170324094029
    if (!format) format = 'YYYY-MM-DD hh:mm:ss.SSS';
    format = format.replace(/YYYY/g, date.getFullYear());
    format = format.replace(/MM/g, ('0' + (date.getMonth() + 1)).slice(-2));
    format = format.replace(/DD/g, ('0' + date.getDate()).slice(-2));
    format = format.replace(/hh/g, ('0' + date.getHours()).slice(-2));
    format = format.replace(/mm/g, ('0' + date.getMinutes()).slice(-2));
    format = format.replace(/ss/g, ('0' + date.getSeconds()).slice(-2));
    if (format.match(/S/g)) {
      var milliSeconds = ('00' + date.getMilliseconds()).slice(-3);
      var length = format.match(/S/g).length;
      for (var i = 0; i < length; i++) format = format.replace(/S/, milliSeconds.substring(i, i + 1));
    }
    return format;
  };























// GWOaccess(){
//    // console.log(this.model.label)
//   let price;
//   if(this.model.label=='スタンダード'){
//       price=15000;
//   }else if(this.model.label=='プレミアム'){
//     price=25000;
//   }else if(this.model.label=='エキスパート'){
// price=35000;
//   }

//
//
// let postUrl = '../../wp-content/themes/wp/lamp-http_server.php';
// let send_data ={
//     price: price,
//     uid: this.uid
//   };
//
//   let headers = new Headers({ 'Content-Type': 'application/json' });
//   let options = new RequestOptions({ headers: headers });
//   let trans_data = JSON.stringify(send_data);
//   this._http.post(postUrl, trans_data, options)
//     .subscribe(
//       res  => {
// this.progressDialogComponent.closeDialog();
//       },
//       error =>{
//         this.progressDialogComponent.closeDialog();
//         this.errorData=error;
//         this.errorDialogComponent.openDialog();
//
//
//       })
//
// }
}
