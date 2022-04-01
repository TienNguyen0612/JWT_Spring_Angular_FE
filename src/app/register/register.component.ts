import { Component, OnInit } from '@angular/core';
import {AuthService} from "../_services/auth.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  formRegister!: FormGroup;
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(private authService: AuthService,
              private fb: FormBuilder) { }

  ngOnInit(): void {
    this.formRegister = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    })
  }

  get username() {
    // @ts-ignore
    return this.formRegister.get('username');
  }

  get email() {
    // @ts-ignore
    return this.formRegister.get('email');
  }

  get password() {
    // @ts-ignore
    return this.formRegister.get('password');
  }

  onSubmit(): void {
    const register = {
      username: this.formRegister?.value.username,
      email: this.formRegister?.value.email,
      password: this.formRegister?.value.password
    };

    this.authService.register(register).subscribe(
      data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
      },
      err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    );
  }

}
