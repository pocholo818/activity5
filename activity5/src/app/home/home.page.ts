import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { HomeService } from '../services/home.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  updateForm: FormGroup

  data:any=[]
  constructor(private fb: FormBuilder, private router: Router, private homeService: HomeService) {}

  ngOnInit(){
    this.getLocalStorage();
    this.updateForm = this.fb.group({
      user_id: [this.data.user_id],
      username: [this.data.username],
      first_name: [this.data.first_name],
      last_name: [this.data.last_name],
      password: [this.data.password],
      email: [this.data.email]
    })
  }

  update(){
    this.homeService.updateRequest(this.updateForm.value).subscribe((res:any)=>{
      if(res.data){
        this.router.navigate(['/home'])
        localStorage.setItem('user', JSON.stringify(res.data));
      }
      else if(res.data){
        console.log(res.data);
      }
    });
  }

  getLocalStorage(){
    this.data = JSON.parse(localStorage.getItem("user"));
    console.log(this.data);
  }

  logout(){
    localStorage.removeItem("user");
    this.router.navigate(['/login']);
  }

}
