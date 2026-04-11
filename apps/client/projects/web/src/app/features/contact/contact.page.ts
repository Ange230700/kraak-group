import { Component } from '@angular/core';
import { ButtonDirective } from 'primeng/button';
import { InputText } from 'primeng/inputtext';
import { Textarea } from 'primeng/textarea';

@Component({
  selector: 'kraak-contact-page',
  standalone: true,
  imports: [ButtonDirective, InputText, Textarea],
  templateUrl: './contact.page.html',
})
export default class ContactPage {}
