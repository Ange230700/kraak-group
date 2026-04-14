import { Component } from '@angular/core';
import {
  IonIcon,
  IonLabel,
  IonRouterOutlet,
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

interface MobileTabLink {
  readonly label: string;
  readonly tab: string;
  readonly href: string;
  readonly icon: string;
}

addIcons({
  homeOutline,
  bookOutline,
  megaphoneOutline,
  helpCircleOutline,
});

@Component({
  selector: 'kraak-tabs-layout',
  standalone: true,
  imports: [
    IonTabs,
    IonRouterOutlet,
    IonTabBar,
    IonTabButton,
    IonIcon,
    IonLabel,
  ],
  templateUrl: './tabs.layout.html',
})
export class TabsLayout {
  protected readonly tabs: MobileTabLink[] = [
    {
      label: 'Accueil',
      tab: 'accueil',
      href: '/tabs/accueil',
      icon: 'home-outline',
    },
    {
      label: 'Programmes',
      tab: 'programmes',
      href: '/tabs/programmes',
      icon: 'book-outline',
    },
    {
      label: 'Annonces',
      tab: 'annonces',
      href: '/tabs/annonces',
      icon: 'megaphone-outline',
    },
    {
      label: 'Support',
      tab: 'support',
      href: '/tabs/support',
      icon: 'help-circle-outline',
    },
  ];
}
