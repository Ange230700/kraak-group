import { Component, Input } from '@angular/core';

@Component({
  selector: 'kraak-section',
  standalone: true,
  template: `
    <section [class]="sectionClass">
      <div class="container-page">
        @if (title) {
          <header class="section__header">
            <h2 class="section__title">{{ title }}</h2>
            @if (subtitle) {
              <p class="section__subtitle">{{ subtitle }}</p>
            }
          </header>
        }
        <ng-content />
      </div>
    </section>
  `,
})
export class Section {
  @Input() title = '';
  @Input() subtitle = '';
  @Input() size: 'default' | 'lg' = 'default';
  @Input() background: 'default' | 'alt' | 'primary' = 'default';

  protected get sectionClass(): string {
    const sizeClass = this.size === 'lg' ? 'section-lg' : 'section';
    const bgClass =
      this.background !== 'default' ? `section--${this.background}` : '';
    return `${sizeClass} ${bgClass}`.trim();
  }
}
