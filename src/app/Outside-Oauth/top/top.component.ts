import {Component, OnInit, ViewChild} from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";
import {OauthService} from "../oauth.service";
import {URLSearchParams, Jsonp,Headers, RequestOptions, Http} from "@angular/http";
import {OauthInfoService} from "../../Inside-Oauth/oauth-info.service";
import {Md5} from 'ts-md5/dist/md5';
import {FirebaseObjectObservable, AngularFire} from "angularfire2";
@Component({
  selector: 'app-top',
  templateUrl: './top.component.html',
  styleUrls: ['./top.component.css']
})
export class TopComponent implements OnInit {
newLines:any;
gLines:any;
id:string;
param:string;
param2:string;
test2:string;
uuu:string='123';
  Info2: FirebaseObjectObservable<any[]>;
private subscription:Subscription;
data:Date=new Date();
  constructor(private _http: Http,private af : AngularFire,private jsonp: Jsonp,private route:ActivatedRoute,private activatedRoute:ActivatedRoute
             ,private router: Router) {
this.GmoURL()
    this.test2='https://www.google.co.jp/?test='+this.uuu;

 this.subscription=this.route.queryParams.subscribe(
  queryParam=>{this.param=queryParam['test']
  //  this.param2=queryParam['test2']

   console.log(this.param)
   // this.onTest(this.param,this.param2)
   }
 )
//    this.id=activatedRoute.snapshot.params['id'];


    this.gLines = [
      {
        ln_file: "T1301451.json",
        ln_key: "1301451",
        ln_name: "[ＪＲ]岩泉線 (茂市～岩泉) ",

      },
      {
        ln_file: "T1301541.json",
        ln_key: "1301541",
        ln_name: "[ＪＲ]北上線 (北上～横手) "
      },
      {
        ln_file: "T1301671.json",
        ln_key: "1301671",
        ln_name: "[ＪＲ]磐越東線(ゆうゆうあぶくまライン) (いわき～郡山) "
      }];

  }

  GmoURL(){
    let url='/link/(弊社指定の ID)/Multi/Entry?';
    let shopID='testshop';
    let orderID='order001';
    let plice=15000;
    let shoppassword=this.shopInfo();
    let date=this.formatDate(new Date(),'YYYYMMDDhhmmss');
    let uid='123';
//console.log(shoppassword)

   let URL=url+ 'ShopID='+shopID+'&OrderID='+orderID+'&Amount='+plice
    +'&DataTime='+date+'&ShopPassString='+shoppassword+
     '&RetURL=http://localhost:4200/success'+
     '&CancelURL=http://localhost:4200/cancel'+'&ClientField1='+uid;//ClientField1は弊社自由に使用できる

console.log(URL)

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






  GWOaccess(){


    let postUrl = 'http://www.yahoo.co.jp/';
    let send_data ={
      uid: '1234'
    };

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let trans_data = JSON.stringify(send_data);
    this._http.get(postUrl, options)
      .subscribe(
        res  => {

        },
        error =>{


        })

  }
  onTest(data:string,data2:string){
    const Info = {
      dataup:data,
      dataup2:data2
    };
    this.Info2=this.af.database.object('test');
    this.Info2.set(Info).then(data=>{
      //   console.log(data.key)


    }).catch(error=>{

    })
  }




  get(){
    this.newLines= this.gLines.filter((item, index)=>{
      if ((item.ln_name).indexOf('いわき') >= 0) return true;
    });
console.log(this.newLines)

 }

  ngOnInit() {

this.get()

  }
signIn(){

 // this.router.navigate(['/main/image'])
  this.router.navigate(['/signin'])

}
 test(){
 this.getStorageUrl()


  // this.notificationBarService.create({ message: 'アップロード成功', type: NotificationType.Error});
 }

  getStorageUrl() {
    let params = new URLSearchParams();
    params.set('uid', 'test');

   let url = 'http://localhost:8888/rest/http/url?callback=__ng_jsonp__.__req0.finished';
     //let url = 'http://localhost:8888/rest/addFile/url?callback=__ng_jsonp__.__req0.finished';
    this.jsonp
      .get(url, {search: params})
      .subscribe(
        res => {
          console.log(res.json().url);
//console.log(res)
        },
        error => {
        });

  }


}
