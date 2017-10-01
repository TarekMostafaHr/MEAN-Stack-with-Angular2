import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {

  user;
  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {

    this.authService.getProfile().subscribe(data =>{
    this.user = data.user;
    })
  }

}
