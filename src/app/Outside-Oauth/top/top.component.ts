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

  constructor(private af : AngularFire,private jsonp: Jsonp,private route:ActivatedRoute,
              private router: Router) {



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
 // this.getStorageUrl()


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
