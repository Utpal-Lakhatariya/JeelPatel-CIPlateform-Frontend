import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators, FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { HttpService } from '../../../http.service';
import { Router, RouterLink } from '@angular/router';
import { ILogin } from '../../../Interface/authentication';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ButtonModule } from 'primeng/button';
import {PasswordModule} from 'primeng/password';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, MatInputModule, RouterLink, ButtonModule, PasswordModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  matSnackBar=inject(MatSnackBar)

  router = inject(Router)
  httpService = inject(HttpService)
  formbuilder = inject(FormBuilder)

  loginForm = this.formbuilder.group({
    email: ["", [Validators.required, Validators.email]],
    password: ["", [Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)]],
  })

  login() {
   
    const login: ILogin = {
      email: this.loginForm.value.email!,
      password: this.loginForm.value.password!,
    };
  

    //API Call
    this.httpService.login(login).subscribe( {
      next:(response) => {
        if(response.isSuccess)
          { 
            this.router.navigateByUrl("AllMission");
          }

        this.matSnackBar.open(response.message,'Close',{
          duration: 5000,
          horizontalPosition: 'center'
        });
        
   
      },
      error:(error) => {
        this.matSnackBar.open(error.error.message,'Close',{
          duration: 5000,
          horizontalPosition: 'center'
        });
        this.router.navigateByUrl("login");
      }
   
    })

  }
}
