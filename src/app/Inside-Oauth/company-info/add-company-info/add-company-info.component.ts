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
import {InsideMainService} from "../../inside-main.service";
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
data:string='yyyyyy';
gmoData:any[]=[];
@ViewChild("errorDialog") errorDialogComponent: ErrorDialogComponent;
   errorData:string;
   @ViewChild("progrssDialog") progressDialogComponent: ProgressDialogComponent;
   Data:string;
  @ViewChild("cardDialog") cardDialogComponent: AddCardComponent;
  urlData:string;
  OrderID:string;
  constructor(private insideMainService:InsideMainService,private fb: FormBuilder,private companyInfoService:CompanyInfoService,private oauthInfoService:OauthInfoService) {
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
    let date=this.formatDate(new Date(),'YYYYMMDDhhmmss');
    this.OrderID=this.uid.substr(0,13)+date;
    let priceData;
    priceData=this.companyInfoService.getPrice(this.model.label);
    this.Data="";
    this.progressDialogComponent.openDialog();
      this.companyInfoService.addCompanyDetail(this.myForm.value,this.uid,priceData,this.OrderID).then((data)=>{//ここではまだtermは変更しない　0のまま。カード登録が終わったらtermを1にする
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
    priceData=this.companyInfoService.getPrice(this.model.label);

    //let url='http://localhost:8888/sendgwo?';//https://pt01.mul-pay.jp/link/tshop00027379/Multi/Entry
    let url=this.insideMainService.url;

    //let shopID='tshop00027379';//tshop00027379
    let shopID=this.insideMainService.shopID;

    let date=this.formatDate(new Date(),'YYYYMMDDhhmmss');
    let uid=this.uid;
    // let orderID=uid.substr(0,13)+date;
    let plice=priceData;
    let shoppassword=this.shopInfo(this.OrderID,priceData,date);
    let kainInfo=this.kainInfo(uid,date);

   //  let syurui='QCcloud';
    let syurui=this.insideMainService.syurui;

    //let JobCd='CHECK';
    let JobCd=this.insideMainService.JobCd;


   // let siteID='tsite00024826';//	tsite00024826
    let siteID=this.insideMainService.siteID;

    let memberID=uid;
     let companyname=this.companyname;
    let kainInfo2=this.kainInfo2(uid,date);

   // let reURL='http://localhost:8888/successeditcard';
    let reURL=this.insideMainService.url;

   // let canURL='http://localhost:8888/cancel';
let canURL=this.insideMainService.canURL;


    let URL=url+'ShopID='+shopID+'&OrderID='+this.OrderID+'&Amount='+plice
      +'&DateTime='+date+'&ShopPassString='+shoppassword+
      '&RetURL='+reURL+
      '&CancelURL='+canURL+'&UseCredit=1'+'&SiteID=tsite00024826'+'&MemberID='+uid+'&JobCd='+JobCd+
      '&MemberPassString='+kainInfo+'&ClientField1='+uid+'&ClientField2='+companyname+'/'+syurui+'/'+kainInfo2
      +'&ClientField3='+siteID+'/'+memberID+'/'+date;//ClientField1は弊社自由に使用できる

    //console.log(URL)
this.urlData=URL;
  }

  //サイト ID＝testsite   会員 ID＝300028   サイトパスワード＝abcdefgh   日時情報＝20080401092355
  // 会員情報チェック文字列＝「”testsite|300028|abcdefgh|20080401092355” をＭＤ５でハッシュした値」
  kainInfo(uid:string,date:any){
   // let siteID='tsite00024826';//	tsite00024826
    let siteID=this.insideMainService.siteID;

    let kainID=uid;

    //let sitepassword='6yh42aya';//6yh42aya
    let sitepassword=this.insideMainService.sitepassword;

    return Md5.hashStr(siteID+'|'+kainID+'|'+sitepassword+'|'+date);

  }

  //サイト ID＝testsite   会員 ID＝300028   サイトパスワード＝abcdefgh   日時情報＝20080401092355
  // 会員情報チェック文字列＝「”testsite|300028|abcdefgh|20080401092355” をＭＤ５でハッシュした値」
  kainInfo2(uid:string,date:any){
   // let siteID='tsite00024826';//	tsite00024826
    let siteID=this.insideMainService.siteID;

    //let shopID='tshop00027379';
    let shopID=this.insideMainService.shopID;

    let kainID=uid;

   // let sitepassword='6yh42aya';//6yh42aya
    let sitepassword=this.insideMainService.sitepassword;


   // let shoppassword='ncea14h4';
    let shoppassword=this.insideMainService.shoppassword;

 //   console.log(siteID+'|'+kainID+'|'+shopID+'|'
  //    +this.OrderID+'|'+sitepassword+'|'+shoppassword+'|'+date);
//console.log(siteID+'|'+kainID+'|'+shopID+'|'
 // +this.OrderID+'|'+sitepassword+'|'+shoppassword+'|'+date)
    return Md5.hashStr(siteID+'|'+kainID+'|'+shopID+'|'
      +this.OrderID+'|'+sitepassword+'|'+shoppassword+'|'+date);

  }


//   ショップ ID＝testshop   オーダーID＝order001   利用金額＝1000   税送料＝80   ショップパスワード＝abcdefgh   日時情報＝20080401092355
//
// ■税送料を送信する場合 ショップ情報確認文字列＝「”testshop|order001|1000|80|abcdefgh|20080401092355” をＭＤ５でハッシュした値」
//
// ■税送料を送信しない場合 ショップ情報確認文字列＝「”testshop|order001|1000||abcdefgh|20080401092355” をＭＤ５でハッシュした値」
  shopInfo(orderid:string,pliceData:number,date:any){//税抜きで作成
    //let shopID='tshop00027379';
    let shopID=this.insideMainService.shopID;

    let orderID=orderid;
    let plice=pliceData;

    //let shoppassword='ncea14h4';//ncea14h4
    let shoppassword=this.insideMainService.shoppassword;

    // let date=this.formatDate(new Date(),'YYYYMMDDhhmmss');
   // console.log(shopID+'|'+orderID+'|'+plice+'|'+'|'+shoppassword+'|'+date)
   return Md5.hashStr(shopID+'|'+orderID+'|'+plice+'|'+'|'+shoppassword+'|'+date);
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
