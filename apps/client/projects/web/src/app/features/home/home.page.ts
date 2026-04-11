import { Component } from '@angular/core';

@Component({
  selector: 'kraak-home-page',
  standalone: true,
  template: `
    <section class="px-6 py-16 text-center">
      <h1 class="text-4xl font-bold mb-4">Bienvenue chez KRAAK</h1>
      <p class="text-lg text-gray-600">
        Formation, gestion de projet et conseil en immigration au service de
        votre autonomie.
      </p>
    </section>
  `,
})
export default class HomePage {}
