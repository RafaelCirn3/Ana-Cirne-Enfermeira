import {
  AfterViewInit,
  Component,
  OnDestroy
} from '@angular/core';

import { CommonModule } from '@angular/common';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements AfterViewInit, OnDestroy {

  // =========================================================
  // MENU
  // =========================================================

  menuOpen = false;


  // =========================================================
  // FAQ
  // =========================================================

  openFaq: number | null = null;

  faqItems = [
    {
      q: 'Como funciona o atendimento?',
      a: 'O atendimento começa com uma avaliação profissional para compreender a necessidade apresentada e definir a melhor conduta de cuidado.'
    },
    {
      q: 'A laserterapia é indicada para qualquer pessoa?',
      a: 'A indicação depende da avaliação profissional e das características de cada caso. A laserterapia é utilizada como recurso complementar dentro de um plano de cuidado.'
    },
    {
      q: 'Vocês realizam tratamento de feridas?',
      a: 'Sim. São realizados avaliação, acompanhamento e cuidados relacionados a feridas, sempre considerando as necessidades apresentadas durante a avaliação.'
    },
    {
      q: 'Como posso agendar uma avaliação?',
      a: 'Você pode entrar em contato pelo WhatsApp para explicar sua necessidade e receber informações sobre o atendimento.'
    }
  ];


  // =========================================================
  // LINKS
  // =========================================================

  whatsappUrl =
    'https://wa.me/5583993011821?text=Olá%2C%20gostaria%20de%20saber%20mais%20sobre%20os%20atendimentos.';

  instagramUrl =
    'https://www.instagram.com/cuidados.enf.anacirne/';


  // =========================================================
  // GSAP
  // =========================================================

  private ctx?: gsap.Context;


  // =========================================================
  // ANGULAR
  // =========================================================

  ngAfterViewInit(): void {

    /*
     * Espera o Angular terminar de renderizar
     * todos os elementos antes de iniciar o GSAP.
     */
    requestAnimationFrame(() => {
      this.initAnimations();
    });

  }


  ngOnDestroy(): void {

    /*
     * Remove todas as animações e ScrollTriggers
     * criados por este componente.
     */
    this.ctx?.revert();

  }


  // =========================================================
  // MENU
  // =========================================================

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }


  closeMenu(): void {
    this.menuOpen = false;
  }


  // =========================================================
  // FAQ
  // =========================================================

  toggleFaq(index: number): void {

    this.openFaq =
      this.openFaq === index
        ? null
        : index;

  }


  // =========================================================
  // INICIALIZAÇÃO GSAP
  // =========================================================

  private initAnimations(): void {

    this.ctx = gsap.context(() => {

      /*
       * Primeiro garantimos que TODO o conteúdo
       * esteja visível.
       *
       * Isso evita que algum elemento fique preso
       * em opacity: 0 caso o ScrollTrigger não seja
       * executado.
       */

      gsap.set(
        [
          '.hero-copy',
          '.hero-card',
          '.care-card',
          '.services .section-heading',
          '.service-card',
          '.laser-copy',
          '.laser-panel',
          '.about-badge',
          '.about-copy',
          '.credentials span',
          '.faq .section-heading',
          '.faq-item',
          '.contact > div'
        ],
        {
          opacity: 1,
          visibility: 'visible'
        }
      );



      // ================================================
      // INTRO
      // ================================================

      this.animateIntro();


      // ================================================
      // SERVIÇOS
      // ================================================

      this.animateServices();


      // ================================================
      // LASERTERAPIA
      // ================================================

      this.animateLaser();


      // ================================================
      // SOBRE
      // ================================================

      this.animateAbout();


      // ================================================
      // FAQ
      // ================================================

      this.animateFaq();


      // ================================================
      // CONTATO
      // ================================================

      this.animateContact();


      /*
       * Depois de criar todas as animações,
       * recalculamos as posições.
       */
      ScrollTrigger.refresh();

    });

  }




  // =========================================================
  // INTRO
  // =========================================================

  private animateIntro(): void {

    /*
     * Estado inicial escondido — garante que o card
     * não "pisque" visível antes do scroll chegar nele.
     */
    gsap.set('.care-card', { opacity: 0, y: 36 });

    /*
     * batchMax: 1 trata cada card como gatilho próprio,
     * então eles entram um de cada vez conforme a rolagem
     * chega em cada um — não todos juntos com o container.
     */
    ScrollTrigger.batch('.care-card', {
      start: 'top 78%',
      once: true,
      batchMax: 1,
      onEnter: (batch) =>
        gsap.to(batch, {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power2.out'
        })
    });

  }


  // =========================================================
  // SERVIÇOS
  // =========================================================

  private animateServices(): void {

    gsap.from('.services .section-heading', {

      scrollTrigger: {
        trigger: '.services',
        start: 'top 78%',
        once: true
      },

      opacity: 0,
      y: 30,

      duration: 0.8,

      ease: 'power2.out'

    });


    gsap.set('.service-card', { opacity: 0, y: 40 });

    ScrollTrigger.batch('.service-card', {
      start: 'top 78%',
      once: true,
      batchMax: 1,
      onEnter: (batch) =>
        gsap.to(batch, {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power2.out'
        })
    });

  }


  // =========================================================
  // LASERTERAPIA
  // =========================================================

  private animateLaser(): void {

    gsap.from('.laser-copy', {

      scrollTrigger: {
        trigger: '.laser',
        start: 'top 85%',
        once: true
      },

      opacity: 0,
      x: -45,

      duration: 0.8,

      ease: 'power3.out'

    });


    gsap.from('.laser-panel', {

      scrollTrigger: {
        trigger: '.laser',
        start: 'top 85%',
        once: true
      },

      opacity: 0,
      x: 45,

      duration: 1,

      ease: 'power3.out'

    });


    gsap.from('.laser-panel li', {

      scrollTrigger: {
        trigger: '.laser-panel',
        start: 'top 80%',
        once: true
      },

      opacity: 0,
      x: 20,

      stagger: 0.1,

      duration: 0.45,

      ease: 'power2.out'

    });

  }


  // =========================================================
  // SOBRE
  // =========================================================

  private animateAbout(): void {

    gsap.from('.about-badge', {

      scrollTrigger: {
        trigger: '.about',
        start: 'top 85%',
        once: true
      },

      opacity: 0,
      scale: 0.9,
      x: -35,

      duration: 1,

      ease: 'power3.out'

    });


    gsap.from('.about-copy', {

      scrollTrigger: {
        trigger: '.about',
        start: 'top 85%',
        once: true
      },

      opacity: 0,
      x: 40,

      duration: 1,

      ease: 'power3.out'

    });


    gsap.from('.credentials span', {

      scrollTrigger: {
        trigger: '.credentials',
        start: 'top 90%',
        once: true
      },

      opacity: 0,
      y: 15,

      stagger: 0.08,

      duration: 1,

      ease: 'power2.out'

    });

  }


  // =========================================================
  // FAQ
  // =========================================================

  private animateFaq(): void {

    /*
     * Título da seção
     */

    gsap.from('.faq .section-heading', {

      scrollTrigger: {
        trigger: '.faq',
        start: 'top 85%',
        once: true
      },

      opacity: 0,
      y: 35,

      duration: 1,

      ease: 'power2.out'

    });


    /*
     * Itens
     */

    gsap.from('.faq-item', {

      scrollTrigger: {
        trigger: '.faq-grid',
        start: 'top 90%',
        once: true
      },

      opacity: 0,
      y: 30,

      stagger: 0.1,

      duration: 0.6,

      ease: 'power3.out'

    });

  }


  // =========================================================
  // CONTATO
  // =========================================================

  private animateContact(): void {

    gsap.from('.contact > div', {

      scrollTrigger: {
        trigger: '.contact',
        start: 'top 90%',
        once: true
      },

      opacity: 0,
      y: 30,

      stagger: 0.12,

      duration: 0.7,

      ease: 'power3.out'

    });

  }

}