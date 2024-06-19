import { Routes } from '@angular/router';
import { LoginComponent } from './components/authentication/login/login.component';
import { SignupComponent } from './components/authentication/signup/signup.component';
import { ForgotPasswordComponent } from './components/authentication/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/authentication/reset-password/reset-password.component';
import { AddNewMissionComponent } from './components/Missions/add-new-mission/add-new-mission.component';
import { AllMissionsComponent } from './components/Missions/all-missions/all-missions.component';

export const routes: Routes = [
    {
        path:"",
        redirectTo:'login',
        pathMatch:'full'
    },
    {
        path:"login",
        component:LoginComponent
    },
    {
        path:"signup",
        component:SignupComponent
    },
    {
        path:"forgotPassword",
        component:ForgotPasswordComponent
    },
    {
        path:"resetPassword",
        component:ResetPasswordComponent
    },
    {
        path:"AllMission",
        component:AllMissionsComponent
    },
    {
        path:"AddMission",
        component:AddNewMissionComponent
    },
];
