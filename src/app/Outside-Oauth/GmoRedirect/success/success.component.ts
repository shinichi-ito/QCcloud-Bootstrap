import {Component, OnInit, OnDestroy} from '@angular/core';
import {Subscription} from "rxjs";
import {FirebaseObjectObservable, AngularFire} from "angularfire2";
import {Router, ActivatedRoute} from "@angular/router";
import * as firebase from 'firebase'
@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.css']
})
export class SuccessComponent implements OnInit ,OnDestroy{
  param:string;
  error:string;
  errorData:string;
  param2:string;
  Info2: FirebaseObjectObservable<any[]>;
  private subscription:Subscription;
  Info: FirebaseObjectObservable<any[]>;
  uid:string='Qu7zPPa2usMf8VubSWlbGsLzL933';
  constructor(private route:ActivatedRoute,private af : AngularFire) {
    this.subscription=this.route.queryParams.subscribe(
      queryParam=>{this.param=queryParam['ClientField1'];
      this.error=queryParam['ErrCode'];
      this.errorData=queryParam['ErrInfo'];



        if (typeof this.param === "undefined") {
          console.log('ない')
        }else{
          console.log(this.param)
          // this.addCompanyDetail(this.uid)
        }


      }
    )



  }

  addCompanyDetail(uid: string){
    const companyInfo = {
      term:1,//1の時は　30日経過して正規の会社情報を登録した
      cardAdd:firebase.database.ServerValue.TIMESTAMP,
    };
    this.Info = this.af.database.object('companyData/' + uid + '/companyInfo');
    return this.Info.update(companyInfo)


  }



  // addCardData(data:string){
  //   const Info = {
  //     dataup:data
  //   };
  //   this.Info2=this.af.database.object('test');
  //   this.Info2.set(Info).then(data=>{
  //     //   console.log(data.key)
  //
  //
  //   }).catch(error=>{
  //
  //   })
  // }

  ngOnInit() {
 //   this.notificationBarService.create({ message: 'アップロード成功', type: NotificationType.Error});
  }
ngOnDestroy(){
    this.subscription.unsubscribe();
}
}
