import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators, FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpService } from '../../../http.service';
import { Router, RouterLink } from '@angular/router';
import { IForgot } from '../../../Interface/authentication';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ButtonModule } from 'primeng/button';
@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, RouterLink, ButtonModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent {

  matSnackBar=inject(MatSnackBar)
  router = inject(Router)
  httpService = inject(HttpService)
  formbuilder = inject(FormBuilder)
  forgotForm = this.formbuilder.group({
    email: ["", [Validators.required]],
  })

  ForgotPassword() {
    const forgot: IForgot = {   
     
      email: this.forgotForm.value.email!,
     
    };

    this.httpService.forgot(forgot).subscribe({
        next:(response) => {

          if(response.isSuccess)
            {
              this.router.navigateByUrl("login");
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
