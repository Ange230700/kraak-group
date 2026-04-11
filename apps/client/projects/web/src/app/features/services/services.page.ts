import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonDirective } from 'primeng/button';

@Component({
  selector: 'kraak-services-page',
  standalone: true,
  imports: [RouterLink, ButtonDirective],
  templateUrl: './services.page.html',
})
export default class ServicesPage {}
