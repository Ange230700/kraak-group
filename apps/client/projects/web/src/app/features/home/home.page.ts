import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonDirective } from 'primeng/button';

import { CtaBanner } from '../../shared/cta-banner/cta-banner';

@Component({
  selector: 'kraak-home-page',
  standalone: true,
  imports: [RouterLink, ButtonDirective, CtaBanner],
  templateUrl: './home.page.html',
})
export default class HomePage {}
