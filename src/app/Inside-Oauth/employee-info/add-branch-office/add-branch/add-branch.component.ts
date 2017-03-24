import {Component, OnInit, ViewChild} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {AngularFire} from "angularfire2";
import {OauthInfoService} from "../../../oauth-info.service";
import {InsideService} from "../../../Inside.service";
import {ErrorDialogComponent} from "../../../Dialog/error-dialog/error-dialog.component";

@Component({
  selector: 'app-add-branch',
  templateUrl: './add-branch.component.html',
  styleUrls: ['./add-branch.component.css']
})
export class AddBranchComponent implements OnInit {
  @ViewChild("errorDialog") errorDialogComponent: ErrorDialogComponent;
  errorData:any;
  myForm: FormGroup;
  uid:string;
  constructor( private af : AngularFire,private oauthInfoService:OauthInfoService,private insideService:InsideService,private fb: FormBuilder) {
    this.uid=this.oauthInfoService.uid;
    this.myForm = this.fb.group({
      "tourokusya": ['',
        Validators.required
      ],
      "siten": ['',Validators.compose([
          Validators.required
        ]
      )]
    });

  }

  ngOnInit() {
  }

  Add(){
    this.insideService.addSiten(this.myForm.value,this.uid).then(data=>{

    }).catch(error=>{

      this.errorData=error.message;
      this.errorDialogComponent.openDialog()
    })
  }


}
