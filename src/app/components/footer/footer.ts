import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

interface FooterLink {
  label: string;
  route: string;
}

interface SocialLink {
  name: string;
  icon: string;
  url: string;
  ariaLabel: string;
  class: string;
}

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer {
  currentYear = new Date().getFullYear();

  // Brand information
  brandInfo = {
    name: 'Cute Crafts Gifts',
    tagline: 'Handmade crochet creations with premium wool',
    logo: 'assets/img/cc-logo.png'
  };

  // Product categories - showcasing what you make
  products = [
    '🔑 Keyrings',
    '🧣 Scarves', 
    '🧸 Dolls',
    '🌸 Flowers',
    '💐 Bouquets'
  ];

  // Quick links
  quickLinks: FooterLink[] = [
    { label: 'Home', route: '/' },
    { label: 'Products', route: '/products' },
    { label: 'About', route: '/about' }
  ];

  // Social links - Instagram, Pinterest, WhatsApp
  socialLinks: SocialLink[] = [
    {
      name: 'Instagram',
      icon: 'bi bi-instagram',
      url: 'https://www.instagram.com/cutecraftsgifts/',
      ariaLabel: 'Follow us on Instagram',
      class: 'instagram'
    },
    {
      name: 'Pinterest',
      icon: 'bi bi-pinterest',
      url: 'https://www.pinterest.com/cutecraftsgifts/',
      ariaLabel: 'Follow us on Pinterest',
      class: 'pinterest'
    },
    {
      name: 'WhatsApp',
      icon: 'bi bi-whatsapp',
      url: 'https://wa.me/917717780275',
      ariaLabel: 'Order on WhatsApp',
      class: 'whatsapp'
    }
  ];
}