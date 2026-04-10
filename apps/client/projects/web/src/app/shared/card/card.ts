import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'kraak-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './card.html',
})
export class Card {
  @Input() title = '';
  @Input() description = '';
  @Input() icon = '';
  @Input() link = '';
  @Input() linkLabel = '';
}
