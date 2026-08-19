import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  menuOpen = false;

  readonly whatsappUrl = 'https://wa.me/5583993011821?text=Ol%C3%A1%2C%20Ana!%20Gostaria%20de%20saber%20mais%20sobre%20o%20atendimento.';
  readonly instagramUrl = 'https://www.instagram.com/cuidados.enf.anacirne';

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu(): void {
    this.menuOpen = false;
  }
}
