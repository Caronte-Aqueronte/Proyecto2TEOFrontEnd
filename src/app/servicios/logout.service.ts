import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class LogoutService {
  constructor(private cookiesService: CookieService) {}

  public logout(): void {
    this.cookiesService.delete('usuario');
  }
}
