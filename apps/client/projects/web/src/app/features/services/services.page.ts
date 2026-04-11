import { Component } from '@angular/core';

import { CtaBanner } from '../../shared/cta-banner/cta-banner';

@Component({
  selector: 'kraak-services-page',
  standalone: true,
  imports: [CtaBanner],
  templateUrl: './services.page.html',
})
export default class ServicesPage {}
