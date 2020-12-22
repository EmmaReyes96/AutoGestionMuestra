import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivityUserService } from 'src/app/services/ActivityUser.service';
import { SwalCustomService } from 'src/app/services/swal-custom.service';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss']
})
export class HelpComponent implements OnInit {

  public messageForm : FormGroup;
  private emailPattern: any = /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/;

  constructor(private fb: FormBuilder, private UserActivity: ActivityUserService, private Swal: SwalCustomService) { }

  ngOnInit(): void {
   this.clean();
  }

  clean(){
    this.messageForm = this.fb.group({
      name: ['', Validators.required],
      affair: ['', Validators.required],
      email: ['', [Validators.required, Validators.minLength(5), Validators.pattern(this.emailPattern)]],
      message: ['', Validators.required],
    })
  }

  Mailer(){
    this.UserActivity.Messange(this.messageForm.value).subscribe(()=>{
      this.Swal.SwalConfim('Su mensaje ha sido envido. Muchas gracias por su aporte!!!')
    },(err)=>{
      this.Swal.SwalError(err);
    })
  }

}
