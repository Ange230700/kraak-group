import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  IonButton,
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { FeatureCardComponent } from '../../shared/ui/feature-card/feature-card.component';

interface HomeHighlight {
  readonly tag: string;
  readonly title: string;
  readonly description: string;
  readonly tone: 'primary' | 'accent';
}

@Component({
  selector: 'kraak-home-page',
  standalone: true,
  imports: [
    IonButton,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    RouterLink,
    FeatureCardComponent,
  ],
  templateUrl: './home.page.html',
})
export default class HomePage {
  protected readonly resourceLibraryHref = '/tabs/programmes/ressources';

  protected readonly highlights: HomeHighlight[] = [
    {
      tag: 'Programmes',
      title: 'Avancez avec un cadre clair.',
      description:
        'Retrouvez vos parcours actifs, leurs prochaines étapes et les détails utiles.',
      tone: 'primary',
    },
    {
      tag: 'Annonces',
      title: 'Restez aligné avec les mises à jour importantes.',
      description:
        'Gardez un oeil sur les informations clés à relayer rapidement.',
      tone: 'accent',
    },
    {
      tag: 'Support',
      title: "Demandez de l'aide sans quitter votre parcours.",
      description:
        "Accédez aux bons points de contact quand vous avez besoin d'un relais.",
      tone: 'primary',
    },
  ];
}
