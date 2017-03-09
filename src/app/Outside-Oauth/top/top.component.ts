import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {NotificationType, NotificationBarService} from "angular2-notification-bar";

@Component({
  selector: 'app-top',
  templateUrl: './top.component.html',
  styleUrls: ['./top.component.css']
})
export class TopComponent implements OnInit {
newLines:any;
gLines:any;
  constructor(private notificationBarService:NotificationBarService,private router: Router) {
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
// test(){
//   this.notificationBarService.create({ message: 'アップロード成功', type: NotificationType.Error});
// }
}
