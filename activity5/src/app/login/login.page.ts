import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup

  constructor(private fb: FormBuilder, private loginService: LoginService, private router: Router) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login(){
    //console.log(this.loginForm.value);
    if (this.loginForm.valid){
      this.loginService.loginRequest(this.loginForm.value).subscribe((res:any) => {
        if(res.data){
          console.log(res)

          if(res.data){
            this.router.navigate(['/home'])
            localStorage.setItem('user', JSON.stringify(res.data));
          }
          else if(res.data){
            console.log(res.data);
          }
        }
        else{
          console.log(res.error);
        }
      });
    }
    
  }

}
