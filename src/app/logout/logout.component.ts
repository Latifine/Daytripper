import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '@auth0/auth0-angular';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css'
})
export class LogoutComponent {
  constructor(private auth: AuthService) {}
  
  handleLogout(): void {
    this.auth.logout({
      logoutParams: {
        returnTo: environment.redirectUri, // this is where we redirect to when the user is logged out
      },
    });
  }
}

