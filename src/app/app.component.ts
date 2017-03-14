import { Component } from '@angular/core';
import {Router, NavigationEnd} from "@angular/router";
declare var ga: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
 constructor(public router: Router){
   router.events.distinctUntilChanged((previous: any, current: any) => {
     if(current instanceof NavigationEnd) {
       return previous.url === current.url;
     }
     return true;
   }).subscribe((x: any) => {
   //  console.log('router.change', x);
     ga('send', 'pageview', x.url);
   });
 }
}
