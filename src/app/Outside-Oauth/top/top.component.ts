import {Component, OnInit, ViewChild} from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";
import {OauthService} from "../oauth.service";
import {URLSearchParams, Jsonp} from "@angular/http";
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
  Info2: FirebaseObjectObservable<any[]>;
private subscription:Subscription;
  constructor(private af : AngularFire,private jsonp: Jsonp,private route:ActivatedRoute,private activatedRoute:ActivatedRoute
             ,private router: Router) {
 this.subscription=this.route.queryParams.subscribe(
  queryParam=>{this.param=queryParam['test']
  //  this.param2=queryParam['test2']
   // console.log(Md5.hashStr("123456"));
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
//  this.getStorageUrl()


  // this.notificationBarService.create({ message: 'アップロード成功', type: NotificationType.Error});
 }

  getStorageUrl() {
    let params = new URLSearchParams();
    params.set('uid', 'test');
    params.set('syurui', 'test');
    params.set('toukousya', 'test');
    params.set('siten', 'test');
    params.set('busyo', 'test');
    params.set('comment', 'test');
    params.set('mainmail', 'uid');
    let url = 'http://localhost:8888/rest/addFile/url?callback=__ng_jsonp__.__req0.finished';
    // let url = 'http://1-dot-qccloud-asia-northeast1.appspot.com/rest/addFile/url?callback=__ng_jsonp__.__req0.finished';
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
