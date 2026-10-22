import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  template: `
    <header>
      <h1>🥚 Tamagochi</h1>
      <p>Keep your pets alive. Unlike your last production deploy.</p>
    </header>
    <main>
      <router-outlet />
    </main>
  `,
})
export class App {}
