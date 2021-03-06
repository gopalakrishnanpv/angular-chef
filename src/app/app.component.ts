import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) { }
  ngOnInit(): void {
    this.authService.autoLogin();

    this.authService.user.subscribe(user => {
      const isAuthenticated = !!user;
      if (!isAuthenticated) {
        this.router.navigate(['/auth']);
      }
    });
  }
}
