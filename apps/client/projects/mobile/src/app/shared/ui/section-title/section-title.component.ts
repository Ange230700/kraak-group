import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'kraak-section-title',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './section-title.component.html',
})
export class SectionTitleComponent {
  @Input({ required: true }) title = '';
  @Input() overline = '';
  @Input() subtitle = '';
}
