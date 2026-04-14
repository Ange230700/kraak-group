import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonButton, IonContent } from '@ionic/angular/standalone';
import { FeatureCardComponent } from '../../shared/ui/feature-card/feature-card.component';
import { SectionTitleComponent } from '../../shared/ui/section-title/section-title.component';

@Component({
  selector: 'kraak-welcome-page',
  standalone: true,
  imports: [
    IonContent,
    IonButton,
    RouterLink,
    SectionTitleComponent,
    FeatureCardComponent,
  ],
  templateUrl: './welcome.page.html',
})
export default class WelcomePage {}
