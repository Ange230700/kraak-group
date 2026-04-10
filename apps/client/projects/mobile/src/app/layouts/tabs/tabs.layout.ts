import { Component } from '@angular/core';
import {
  IonIcon,
  IonLabel,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  homeOutline,
  bookOutline,
  megaphoneOutline,
  helpCircleOutline,
} from 'ionicons/icons';

addIcons({ homeOutline, bookOutline, megaphoneOutline, helpCircleOutline });

@Component({
  selector: 'kraak-tabs-layout',
  standalone: true,
  imports: [IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel],
  template: `
    <ion-tabs>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="accueil">
          <ion-icon name="home-outline"></ion-icon>
          <ion-label>Accueil</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="programmes">
          <ion-icon name="book-outline"></ion-icon>
          <ion-label>Programmes</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="annonces">
          <ion-icon name="megaphone-outline"></ion-icon>
          <ion-label>Annonces</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="support">
          <ion-icon name="help-circle-outline"></ion-icon>
          <ion-label>Support</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  `,
})
export class TabsLayout {}
