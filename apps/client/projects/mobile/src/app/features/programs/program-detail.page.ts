import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonButton } from '@ionic/angular/standalone';
import { PageShell } from '../../shared/page-shell/page-shell';

@Component({
  selector: 'kraak-program-detail-page',
  standalone: true,
  imports: [PageShell, IonButton, RouterLink],
  templateUrl: './program-detail.page.html',
})
export default class ProgramDetailPage {}
