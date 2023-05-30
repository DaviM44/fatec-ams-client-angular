import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Client } from '../client';

@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.css']
})
export class ClientFormComponent implements OnChanges{
  @Input()
  client: Client = {} as Client;
  @Output()
  saveEvent = new EventEmitter<Client>();
  formGroupClient : FormGroup;
  submitted: boolean = false;

  constructor(private formBuilder: FormBuilder){
      this.formGroupClient = formBuilder.group({
        id : [''],
        name : ['', [Validators.required]],
        email : ['',[Validators.required, Validators.email]]
  
      });
  
    }
  ngOnChanges(changes: SimpleChanges): void {
   this.formGroupClient.setValue(this.client);
  }
    get name() : any{
      return this.formGroupClient.get("name");
    }
    
    get email() : any{
      return this.formGroupClient.get("email");
    }

    clean(){
      this.formGroupClient.reset();
      this.submitted = false;
    }
    save(){
      this.submitted = true;
      if(this.formGroupClient.valid){
        this.saveEvent.emit(this.formGroupClient.value);
        this.formGroupClient.reset();
        this.submitted = false;
      }
    }
}
