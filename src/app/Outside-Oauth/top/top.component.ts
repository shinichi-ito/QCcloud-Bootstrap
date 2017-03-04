import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {NotificationType, NotificationBarService} from "angular2-notification-bar";

@Component({
  selector: 'app-top',
  templateUrl: './top.component.html',
  styleUrls: ['./top.component.css']
})
export class TopComponent implements OnInit {

  constructor(private notificationBarService:NotificationBarService,private router: Router) {


  }

  ngOnInit() {
  }
signIn(){

 // this.router.navigate(['/main/image'])
  this.router.navigate(['/signin'])

}
test(){
  this.notificationBarService.create({ message: 'アップロード成功', type: NotificationType.Error});
}
}
