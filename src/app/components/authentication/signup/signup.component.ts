import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators,  } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpService } from '../../../http.service';
import { Router, RouterLink } from '@angular/router';
import { ISignup } from '../../../Interface/authentication';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, RouterLink, ButtonModule, PasswordModule,InputNumberModule, InputTextModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {


  matSnackBar=inject(MatSnackBar)
  router = inject(Router)
  httpService = inject(HttpService)
  formbuilder = inject(FormBuilder)


  signupForm = this.formbuilder.group({
    firstName:["", [Validators.required]],
    lastName:["", [Validators.required]],
    phoneNumber:["", [Validators.required, Validators.pattern(/^\d{10}$/)]],
    password:["", [Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)]],
    confirmPassword:["", [Validators.required]],
    email: ["", [Validators.required, Validators.email]],
  }, {
    // Apply confirmPasswordValidator to the confirmPassword control
    validators: this.confirmPasswordValidator('confirmPassword')
  }
  
);

//Function to block input number in name feild
blockNumbersOnInput(event: Event): void {
  const input = event.target as HTMLInputElement;
  input.value = input.value.replace(/[0-9]/g, '');
  // Manually trigger change detection to update the form control value
  this.signupForm.get('textValue')?.setValue(input.value);
}


 // Custom validator function for confirming password
 confirmPasswordValidator(controlName: string) {
  return (formGroup: FormGroup) => {
    const passwordControl = formGroup.controls['password'];
    const confirmPasswordControl = formGroup.controls[controlName];
    if (passwordControl.value !== confirmPasswordControl.value) {
      confirmPasswordControl.setErrors({ confirmPassword: true });
    } else {
      confirmPasswordControl.setErrors(null);
    }
  };
}

  // Function to register
  signup() {
    const signup: ISignup = {   
      firstName: this.signupForm.value.firstName!,
      lastName: this.signupForm.value.lastName!,
      phoneNumber: this.signupForm.value.phoneNumber!,
      email: this.signupForm.value.email!,
      password: this.signupForm.value.password!,
      confirmPassword: this.signupForm.value.confirmPassword!,
    };

    this.httpService.signup(signup).subscribe( {
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
