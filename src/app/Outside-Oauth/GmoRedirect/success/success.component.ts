import {Component, OnInit, OnDestroy} from '@angular/core';
import {Subscription} from "rxjs";
import {FirebaseObjectObservable, AngularFire} from "angularfire2";
import {Router, ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.css']
})
export class SuccessComponent implements OnInit ,OnDestroy{
  param:string;
  param2:string;
  Info2: FirebaseObjectObservable<any[]>;
  private subscription:Subscription;
  constructor(private route:ActivatedRoute,private af : AngularFire) {
    this.subscription=this.route.queryParams.subscribe(
      queryParam=>{this.param=queryParam['test'];

     //  this.addCardData(this.param)
      }
    )



  }
  addCardData(data:string){
    const Info = {
      dataup:data
    };
    this.Info2=this.af.database.object('test');
    this.Info2.set(Info).then(data=>{
      //   console.log(data.key)


    }).catch(error=>{

    })
  }

  ngOnInit() {
 //   this.notificationBarService.create({ message: 'アップロード成功', type: NotificationType.Error});
  }
ngOnDestroy(){
    this.subscription.unsubscribe();
}
}
