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
  templateUrl: './tabs.layout.html',
})
export class TabsLayout {}
