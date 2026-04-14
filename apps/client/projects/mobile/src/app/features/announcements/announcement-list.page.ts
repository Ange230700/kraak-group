import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonButton } from '@ionic/angular/standalone';
import { PageShell } from '../../shared/page-shell/page-shell';

@Component({
  selector: 'kraak-announcement-list-page',
  standalone: true,
  imports: [PageShell, IonButton, RouterLink],
  templateUrl: './announcement-list.page.html',
})
export default class AnnouncementListPage {}
