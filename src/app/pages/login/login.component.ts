import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import {
  FormBuilder,
  Validators,
  FormControl,
  ReactiveFormsModule,
  FormsModule
} from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { StyleClassModule } from 'primeng/styleclass';
import { PanelModule } from 'primeng/panel';
import { CommonModule } from '@angular/common';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { AuthService } from '../../services/auth.service';

@Component({
  standalone:true,
  imports:[RouterModule, RouterOutlet, ToastModule,CardModule, ButtonModule, InputTextModule, StyleClassModule
  ,PanelModule, ReactiveFormsModule,CommonModule, CalendarModule,CheckboxModule],
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export default class LoginComponent implements OnInit {

  private router = inject(Router);
  public formBuilder = inject(FormBuilder);
  private authService = inject(AuthService);

  ngOnInit() {
    //localStorage.getItem("t");
  }

  showPasswordRepeat: boolean = false;
  showPassword: boolean = false;
  passwordTooggleIcon: string  = 'pi-eye';
  passwordTooggleIconRepeat: string = 'pi-eye-slash';

  get Email(){
    return this.loginForm.get('userEmail') as FormControl;
  }

  get Password(){
    return this.loginForm.get('password') as FormControl;
  }

  loginForm = this.formBuilder.group({
    userEmail: [
      '',
      [
        Validators.required,
        Validators.pattern(
          '^[a-zA-Z0-9._%-]+@[a-zA-Z0-9-]+.[a-zA-Z]{2,4}$'
          //"/^[_a-z0-9-]+(.[_a-z0-9-]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,3})$/"
        ),
      ],
    ],
    password: ['', [Validators.required, Validators.minLength(7)]],
  });

  public errorMessages: any = {
    Email: [
      { type: 'required', message: 'Por favor de llenar el campo' },
      {
        type: 'pattern',
        message: 'Por favor ingrese un correo electrónico valido',
      },
    ],
    Password: [
      { type: 'required', message: 'Por favor de llenar el campo' },
      {
        type: 'minlength',
        message: 'Por favor ingrese la contraseña correcta',
      },
    ],
  };

  passwordTooggle(): void {
    this.showPassword = !this.showPassword;
    if (this.passwordTooggleIcon == 'eye') {
      this.passwordTooggleIcon = 'eye-off';
    } else {
      this.passwordTooggleIcon = 'eye';
    }
  }

  async login() {
   try{
    let response: any = await this.authService.singInUser(this.loginForm.value);
    localStorage.setItem('t',response.data.token);
    return this.router.navigate(['/start']);
  }catch(e:any){
    console.log(e);
    return null;
   }
  }
}