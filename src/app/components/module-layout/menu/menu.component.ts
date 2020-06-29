import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AuthService } from '../../../services/auth.service';
import { HelperService } from '../../../services/helper.service';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  public rol = 'OTHER';
  public message: string;
  public actual;
  constructor(public authService: AuthService, private helper: HelperService) { }

  ngOnInit() {
    this.helper.rolObs.subscribe(msg => this.rol = msg);
    this.actual = this.authService.getCurrentUser();
    if (this.actual) {
      this.rol = this.actual.rol;
    }
  }
}
