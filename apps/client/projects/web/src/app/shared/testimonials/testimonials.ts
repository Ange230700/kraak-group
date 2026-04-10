import { Component, Input } from '@angular/core';

export interface Testimonial {
  quote: string;
  author: string;
  role?: string;
}

@Component({
  selector: 'kraak-testimonials',
  standalone: true,
  templateUrl: './testimonials.html',
})
export class Testimonials {
  @Input() items: Testimonial[] = [];
  @Input() placeholder = true;
}
