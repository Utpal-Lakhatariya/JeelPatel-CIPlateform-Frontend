import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators, FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpService } from '../../../http.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IReset, ISignup } from '../../../Interface/authentication';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';
@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, ButtonModule,PasswordModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent {

  matSnackBar = inject(MatSnackBar)

  router = inject(Router)
  httpService = inject(HttpService)
  formbuilder = inject(FormBuilder)
  resetForm = this.formbuilder.group({
    password: ["", [Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)]],
    confirmPassword: ["", [Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)]],

  })

  route = inject(ActivatedRoute);
  // ngOnInit(): void {
  //   // Extract token from URL
  //   this.token =
  //   console.log(this.token);

  //   // Make API call with token
  //   this.resetPassword();
  // }

  ResetPassword() {
    console.log("save hit")
    const reset: IReset = {

      password: this.resetForm.value.password!,
      confirmPassword: this.resetForm.value.confirmPassword!,
      token: this.route.snapshot.queryParamMap.get('token') ?? "",
      email: this.route.snapshot.queryParamMap.get('email') ?? "",
    };
    console.log("signup create")

    console.log(reset)
    this.httpService.reset(reset).subscribe({
      next: (response) => {

        if (response.isSuccess) {
          this.router.navigateByUrl("login");
        }

        this.matSnackBar.open(response.message, 'Close', {
          duration: 5000,
          horizontalPosition: 'center'
        });

      },
      error: (error) => {
        this.matSnackBar.open(error.error.message, 'Close', {
          duration: 5000,
          horizontalPosition: 'center'
        });
        this.router.navigateByUrl("login");
        console.log("failure")
      }

    })

  }

}
