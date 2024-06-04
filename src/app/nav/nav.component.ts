import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService, User } from '@auth0/auth0-angular';
import { LoginComponent } from '../login/login.component';
import { SignupComponent } from '../signup/signup.component';
import { LogoutComponent } from '../logout/logout.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule, LoginComponent, SignupComponent, LogoutComponent, RouterModule],
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavComponent {
  user: User | null = null;
  isAuthenticated = signal(false);
  isMenuOpen: boolean = false;

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }
  
  constructor(public authService: AuthService) {
    this.authService.isAuthenticated$.subscribe((auth) => {
      this.isAuthenticated.set(auth);
    });
  }

  ngOnInit(): void {
    this.authService.user$.subscribe(
      (profile) => {
        if (profile) {
          this.user = profile;
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
}