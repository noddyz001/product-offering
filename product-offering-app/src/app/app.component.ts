import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'product-offering-app';
  constructor(private router: Router)
  {}
  navigateToLogin()
  {
    this.router.navigate(['/login']);
  }

  navigateToOrders()
  {
    this.router.navigate(['/orderPage']);
  }

}
