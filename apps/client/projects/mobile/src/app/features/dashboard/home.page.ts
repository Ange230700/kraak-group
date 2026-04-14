import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  IonButton,
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';

@Component({
  selector: 'kraak-home-page',
  standalone: true,
  imports: [IonButton, IonHeader, IonToolbar, IonTitle, IonContent, RouterLink],
  templateUrl: './home.page.html',
})
export default class HomePage {}
