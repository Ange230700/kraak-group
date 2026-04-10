import { Component, Input } from '@angular/core';
import { Tag } from 'primeng/tag';

@Component({
  selector: 'kraak-badge',
  standalone: true,
  imports: [Tag],
  template: `
    <p-tag [value]="label" [severity]="severity" [rounded]="rounded" />
  `,
  styles: `
    :host {
      display: inline-flex;
    }
  `,
})
export class Badge {
  @Input({ required: true }) label = '';
  @Input() severity:
    | 'success'
    | 'info'
    | 'warn'
    | 'danger'
    | 'secondary'
    | 'contrast'
    | undefined = undefined;
  @Input() rounded = false;
}
