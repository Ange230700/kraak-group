import { Component } from '@angular/core';

import { CtaBanner } from '../../shared/cta-banner/cta-banner';

@Component({
  selector: 'kraak-programs-page',
  standalone: true,
  imports: [CtaBanner],
  templateUrl: './programs.page.html',
})
export default class ProgramsPage {}
