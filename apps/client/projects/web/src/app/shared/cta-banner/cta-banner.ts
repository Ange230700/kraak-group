import { Component, Input } from '@angular/core';
import { Params, RouterLink } from '@angular/router';
import { ButtonDirective } from 'primeng/button';
import { Card } from 'primeng/card';

@Component({
  selector: 'kraak-cta-banner',
  standalone: true,
  imports: [RouterLink, ButtonDirective, Card],
  templateUrl: './cta-banner.html',
})
export class CtaBanner {
  @Input({ required: true }) heading = '';
  @Input() body = '';
  @Input() ctaLabel = '';
  @Input() ctaLink = '';
  @Input() ctaQueryParams: Params | null = null;
}
