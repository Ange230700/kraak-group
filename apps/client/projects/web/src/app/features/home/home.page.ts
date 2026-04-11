import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonDirective } from 'primeng/button';

@Component({
  selector: 'kraak-home-page',
  standalone: true,
  imports: [RouterLink, ButtonDirective],
  templateUrl: './home.page.html',
})
export default class HomePage {}
