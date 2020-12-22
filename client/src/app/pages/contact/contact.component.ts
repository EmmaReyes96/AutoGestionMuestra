import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivityUserService } from 'src/app/services/ActivityUser.service';
import { SwalCustomService } from 'src/app/services/swal-custom.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  public ContactForm: FormGroup;
  public TitleArray = ['Nombre', 'Celular', 'Tel. Fijo', 'Email', 'Edit', 'Del'];
  private emailPattern: any = /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/;

  public ContID: number;
  public SaveEdit: string = 'Save';

  constructor(private form: FormBuilder, 
              private activityService: ActivityUserService,
              private Swal: SwalCustomService) { }

  ngOnInit(): void {
    this.clean();
  }

  newContact(){
    this.activityService.postContact(this.ContactForm.value).subscribe(() => {
      this.Swal.SwalConfim('Carga exitosa')
    },(err)=>{
      this.Swal.SwalError(err)
    })
  }

  EditContact(){
    this.activityService.putContact(this.ContID, this.ContactForm.value).subscribe(() => {
      this.Swal.SwalConfim('Carga exitosa')
    },(err)=>{
      this.Swal.SwalError(err)
    })
  }

  campoNoValid (campo: string): boolean {
    if (this.ContactForm.get(campo).invalid && this.ContactForm.get(campo).value != ''){
      return true
    }else{
      return false
    }
  }

  clean(){
    this.ContactForm = this.form.group({
      name: ['' , Validators.required],
      mobile: ['', [Validators.required, Validators.maxLength(12)]],
      phone: ['', [Validators.required, Validators.maxLength(12)]],
      email: ['', [Validators.required, Validators.minLength(5), Validators.pattern(this.emailPattern)] ]
    })
    this.SaveEdit = 'Save'
  }

  Edit(event){
    this.ContID = event._id;
    this.SaveEdit = 'Edit';
    this.ContactForm = this.form.group({
      name: [event.name , Validators.required],
      mobile: [event.mobile, Validators.required],
      phone: [event.phone, Validators.required],
      email: [event.email, [Validators.required, Validators.email]]
    })
  }

  Delete(event){
    this.activityService.deleteContact(event['_id']).subscribe(()=>{
      this.Swal.SwalConfim('Borrado exitosa')
    },(err)=>{
      this.Swal.SwalError(err)
    })
  }

}
