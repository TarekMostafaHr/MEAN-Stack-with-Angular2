import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService} from '../../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {

  messageClass;
  message;
  processing = false;
  form: FormGroup;


  constructor(
    private FormBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { 
    this.createForm()
  }

    createForm(){
      this.form = this.FormBuilder.group({
        username: ['', Validators.required],
        password: ['', Validators.required]
      });
    }

    disableForm(){
      this.form.controls['username'].disable();
      this.form.controls['password'].disable();
    }
    enableForm(){
      this.form.controls['username'].enable();
      this.form.controls['password'].enable();
    }


    onLoginSubmit(){
      this.processing = false;
      this.disableForm();
      const user = {
        username: this.form.get('username').value,
        password: this.form.get('password').value 

      }

      this.authService.login(user).subscribe(data =>{
        if(!data.success){
          this.messageClass = 'alert alert-danger';
          this.message = data.message;
          this.processing = false;
          this.enableForm();
        }else{
          this.messageClass = 'alert alert-success';
          this.message = data.message;
          this.authService.storeUserData(data.token, data.user);
          setTimeout(()=> {
            this.router.navigate(['/dashboard']);
          }, 2000);
        }
      })
    }
  ngOnInit() {
  }

}
