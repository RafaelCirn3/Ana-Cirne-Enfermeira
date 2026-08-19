import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements AfterViewInit, OnDestroy {
  menuOpen = false;
  private observer?: IntersectionObserver;

  readonly whatsappUrl = 'https://wa.me/5583993011821?text=Ol%C3%A1%2C%20Ana!%20Gostaria%20de%20saber%20mais%20sobre%20o%20atendimento.';
  readonly instagramUrl = 'https://www.instagram.com/cuidados.enf.anacirne';

  ngAfterViewInit(): void {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      document.querySelectorAll<HTMLElement>('.reveal').forEach((element) => {
        element.classList.add('is-visible');
      });
      return;
    }

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            this.observer?.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14, rootMargin: '0px 0px -45px 0px' }
    );

    document.querySelectorAll<HTMLElement>('.reveal').forEach((element) => {
      this.observer?.observe(element);
    });
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu(): void {
    this.menuOpen = false;
  }
}
