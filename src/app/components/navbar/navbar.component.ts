import { Component, inject } from '@angular/core';
import { GeneralService } from '../../services/general.service';

@Component({
  selector: 'app-navbar',
  standalone: false,

  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  generalService = inject(GeneralService);
}
