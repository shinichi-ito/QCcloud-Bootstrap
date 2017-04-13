import {Component, OnInit, Inject, HostListener} from '@angular/core';
import {DOCUMENT} from "@angular/platform-browser";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";


@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {
  public navIsFixed: boolean = false;
  OnOff:boolean;
  private subscription:Subscription;
url:string='https://corded-evening-163501.appspot.com';
  constructor(private route:ActivatedRoute,private router: Router,@Inject(DOCUMENT) private document: Document) {

  }


  ngOnInit() {



  }
  top(){
    this.document.body.scrollTop=0
  }

  //ウインドウのエベント取得参考サイト下記
  // http://brianflove.com/2016/10/10/angular-2-window-scroll-event-using-hostlistener/
  @HostListener("window:scroll", [])
  onWindowScroll() {
    let number = this.document.body.scrollTop;
    if (number > 500) {
     this.OnOff=true
    } else {
    this.OnOff=false;
    }
  }
  login(){
    this.router.navigate(['/signin'])
  }




}
