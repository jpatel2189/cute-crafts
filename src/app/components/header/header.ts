import { isPlatformBrowser } from '@angular/common';
import {
  Component,
  Inject,
  PLATFORM_ID,
  OnInit,
  OnDestroy,
  HostListener,
  ElementRef,
  Renderer2
} from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.html',
  styleUrls: ['./header.css'],
})
export class Header implements OnInit, OnDestroy {

  public isBrowser: boolean;
  private isScrolled = false;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private el: ElementRef,
    private renderer: Renderer2
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit() {
    if (this.isBrowser) {
      // Initialize scroll state
      this.checkScroll();
    }
  }

  ngOnDestroy() {
    // Cleanup if needed
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (this.isBrowser) {
      this.checkScroll();
    }
  }

  private checkScroll(): void {
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    const shouldBeScrolled = scrollPosition > 50;

    if (shouldBeScrolled !== this.isScrolled) {
      this.isScrolled = shouldBeScrolled;
      const headerElement = this.el.nativeElement.querySelector('.app-header');
      
      if (headerElement) {
        if (this.isScrolled) {
          this.renderer.addClass(headerElement, 'scrolled');
        } else {
          this.renderer.removeClass(headerElement, 'scrolled');
        }
      }
    }
  }

  // WhatsApp contact info
  whatsappNumber = '917717780275';
  whatsappUrl = `https://wa.me/${this.whatsappNumber}`;

  // Brand info
  brandInfo = {
    name: 'Cute Crafts Gifts',
    tagline: 'Handmade with love',
    logo: 'assets/img/cc-logo.png'
  };
}