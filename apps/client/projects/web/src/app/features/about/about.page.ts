import { Component } from '@angular/core';

import { CtaBanner } from '../../shared/cta-banner/cta-banner';

@Component({
  selector: 'kraak-about-page',
  standalone: true,
  imports: [CtaBanner],
  templateUrl: './about.page.html',
})
export default class AboutPage {}
