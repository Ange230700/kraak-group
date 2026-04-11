import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonDirective } from 'primeng/button';

@Component({
  selector: 'kraak-programs-page',
  standalone: true,
  imports: [RouterLink, ButtonDirective],
  templateUrl: './programs.page.html',
})
export default class ProgramsPage {}
