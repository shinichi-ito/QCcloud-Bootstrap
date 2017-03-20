import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AngularFire} from "angularfire2";
import * as firebase from 'firebase'
@Component({
  selector: 'app-taikai',
  templateUrl: './taikai.component.html',
  styleUrls: ['./taikai.component.css']
})
export class TaikaiComponent implements OnInit {

  constructor(private router: Router,private af : AngularFire) { }

  ngOnInit() {
  }
  logout(){

      firebase.database().goOffline();//なんかパーミッションのエラーがでたので http://stackoverflow.com/questions/40105221/angularfire2-read-data-once
      //を参考にした　この中に　サインインのさいgoOnlineと書いてあるが　それを設定するとエラーになるので行ってない
      this.af.auth.logout();
      this.router.navigate(['/landing'])


  }
}
