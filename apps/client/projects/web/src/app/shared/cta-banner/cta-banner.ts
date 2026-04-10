import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'kraak-cta-banner',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './cta-banner.html',
})
export class CtaBanner {
  @Input({ required: true }) heading = '';
  @Input() body = '';
  @Input() ctaLabel = '';
  @Input() ctaLink = '';
}
