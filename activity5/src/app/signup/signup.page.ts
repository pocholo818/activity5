import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  signUpForm: FormGroup

  constructor(private fb: FormBuilder, private loginService: LoginService, private router: Router) { }

  ngOnInit() {
    this.signUpForm = this.fb.group({
      username: ['', Validators.required],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', Validators.required]
    });
  }

  signUp(){
    //console.log(this.loginForm.value);
    if (this.signUpForm.valid){
      this.loginService.submitUser(this.signUpForm.value).subscribe((res:any) => {
        if(res.data){
          console.log(res)
          this.router.navigate(['/login'])
        }
        else{
          console.log(res.error);
        }
      });
    }
    
  }

}
