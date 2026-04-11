import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonDirective } from 'primeng/button';

@Component({
  selector: 'kraak-about-page',
  standalone: true,
  imports: [RouterLink, ButtonDirective],
  templateUrl: './about.page.html',
})
export default class AboutPage {}
