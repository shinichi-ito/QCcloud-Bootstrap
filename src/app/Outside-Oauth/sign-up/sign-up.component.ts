import { Component, OnInit } from '@angular/core';
import {OauthInfoService} from "../../Inside-Oauth/oauth-info.service";
import {OauthService} from "../oauth.service";
import {FormGroup, FormBuilder, Validators, FormControl} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  companyname:string;
  email:string;
  password:string;
  confirmPassword:string;
  myForm: FormGroup;
  constructor(private router: Router,private oauthService:OauthService,private oauthInfoService:OauthInfoService ,private fb: FormBuilder) {
    this.oauthService.flagChange$.subscribe((error)=> {
    console.log(error)
 //     this.showError(this.oauthService.errorChange(error))
    })
  }

  ngOnInit() {
    this.myForm = this.fb.group({
      "companyname": ['',
        Validators.required
      ],
      "email": ['',Validators.compose([
          Validators.required,
          Validators.pattern('[A-Za-z0-9.\-]+@[A-Za-z0-9\-]+[.][A-Za-z0-9.\-]+')
        ]
      )],
      "password": ['', Validators.compose([
        Validators.required,
        Validators.minLength(6)
      ])],
      "confirmPassword": ['', Validators.compose([
        Validators.required,
        this.isEqualPassword.bind(this)
      ])],
    });

  }
  SignUp() {
   // this.showLoading();
    this.oauthService.createUser(this.myForm.value).then(
      (authData) => {
        // console.log(authData)
        this.oauthService.firstCompanyData(this.myForm.value,authData.uid).then(data=>{
          this.oauthInfoService.uid = authData.uid;//inside.serviceのuidにデータを入れて　main.componentの初期化時これをもとにデータを引っ張り出す。　または　会社情報登録ページにてuidあるかチェックする。
          this.router.navigate(['/main/topinside'])
        //  this.navCtrl.setRoot(ClaimList);
        }).catch(
          (error)=>{
        //    this.showError(this.oauthService.errorChange(error))
          })

      }
    ).catch(error=>{
   //   this.showError(this.oauthService.errorChange(error.message))

    })
  }
  isEqualPassword(control: FormControl): {[s: string]: boolean} {
    if (!this.myForm) {
      return {passwordsNotMatch: true};

    }
    if (control.value !== this.myForm.controls['password'].value) {
      return {passwordsNotMatch: true};
    }
  }
}
