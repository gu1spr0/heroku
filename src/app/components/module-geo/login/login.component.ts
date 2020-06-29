import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      usuario: new FormControl('', Validators.required)
    });
  }

  onSubmit(value: any) {
    if (this.loginForm.valid) {
      console.log('Exito');
    } else {
      console.log('Error');
    }

  }

}
