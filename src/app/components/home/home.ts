import {
  Component,
  OnInit,
  OnDestroy,
  Inject,
  PLATFORM_ID,
  HostListener
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Product {
  index: number;
  name: string;
  price: number;
  type: string;
  images: string[];
  currentImage: number;
  wishlist: boolean;
  badge?: string;
}

interface CartItem {
  name: string;
  price: number;
  quantity: number;
  image: string;
  type: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
})
export class Home implements OnInit, OnDestroy {

  // ── Hero ──────────────────────────────────────────────
  heroImages = ['IMG-15.jpeg', 'IMG-17.jpeg', 'IMG-18.jpeg', 'image.png'];
  activeHeroIndex = 0;
  private heroInterval: any;
  private productInterval: any;

  // ── Products ──────────────────────────────────────────
  products: Product[] = [
    {
      index: 0,
      name: 'Crochet Teddy',
      price: 799,
      type: 'Soft Toy',
      images: ['IMG-1.jpeg', 'IMG-2.jpeg'],
      currentImage: 0,
      wishlist: false,
      badge: '❤ Bestseller'
    },
    {
      index: 1,
      name: 'Crochet Flower',
      price: 299,
      type: 'Decor Item',
      images: ['IMG-3.jpeg', 'IMG-4.jpeg'],
      currentImage: 0,
      wishlist: false,
      badge: '🌸 New'
    },
    {
      index: 2,
      name: 'Crochet Tote Bag',
      price: 999,
      type: 'Accessory',
      images: ['IMG-5.jpeg', 'IMG-6.jpeg'],
      currentImage: 0,
      wishlist: false
    },
    {
      index: 3,
      name: 'Boho Crochet Bag',
      price: 1199,
      type: 'Accessory',
      images: ['IMG-7.jpeg', 'IMG-8.jpeg'],
      currentImage: 0,
      wishlist: false,
      badge: '✦ Popular'
    },
    {
      index: 4,
      name: 'Mini Crochet Bag',
      price: 799,
      type: 'Accessory',
      images: ['IMG-9.jpeg', 'IMG-10.jpeg'],
      currentImage: 0,
      wishlist: false
    },
    {
      index: 5,
      name: 'Market Bag',
      price: 899,
      type: 'Accessory',
      images: ['IMG-11.jpeg', 'IMG-12.jpeg'],
      currentImage: 0,
      wishlist: false
    },
    {
      index: 6,
      name: 'Crochet Clutch',
      price: 699,
      type: 'Accessory',
      images: ['IMG-13.jpeg', 'IMG-14.jpeg'],
      currentImage: 0,
      wishlist: false
    },
    {
      index: 7,
      name: 'Sunshine Bag',
      price: 949,
      type: 'Accessory',
      images: ['IMG-15.jpeg', 'IMG-16.jpeg'],
      currentImage: 0,
      wishlist: false
    },
    {
      index: 8,
      name: 'Crochet Bucket Bag',
      price: 1099,
      type: 'Accessory',
      images: ['IMG-17.jpeg', 'IMG-18.jpeg'],
      currentImage: 0,
      wishlist: false
    },
    {
      index: 9,
      name: 'Picnic Bag',
      price: 849,
      type: 'Accessory',
      images: ['IMG-19.jpeg', 'IMG-20.jpeg'],
      currentImage: 0,
      wishlist: false
    },
    {
      index: 10,
      name: 'Woven Shoulder Bag',
      price: 999,
      type: 'Accessory',
      images: ['IMG-9.jpeg', 'IMG-10.jpeg'],
      currentImage: 0,
      wishlist: false
    }
  ];

  // ── Filter / Search ───────────────────────────────────
  filteredProducts: Product[] = [];
  searchQuery = '';
  activeCategory = 'All';
  sortBy = 'default';

  get categories(): string[] {
    const types = ['All', ...new Set(this.products.map(p => p.type))];
    return types;
  }

  // ── Cart ──────────────────────────────────────────────
  cart: CartItem[] = [];
  cartOpen = false;
  cartBounce = false;

  // ── Wishlist ──────────────────────────────────────────
  wishlistOpen = false;

  // ── Touch ─────────────────────────────────────────────
  startX = 0;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  // ══════════════════════════════════════════════════════
  // Lifecycle
  // ══════════════════════════════════════════════════════

  ngOnInit(): void {
    this.filteredProducts = [...this.products];

    if (isPlatformBrowser(this.platformId)) {
      const savedCart = localStorage.getItem('cuteCraftsCart');
      if (savedCart) {
        try { this.cart = JSON.parse(savedCart); } catch {}
      }

      const savedWishlist = localStorage.getItem('cuteCraftsWishlist');
      if (savedWishlist) {
        try {
          const wishlistNames: string[] = JSON.parse(savedWishlist);
          this.products.forEach(p => {
            p.wishlist = wishlistNames.includes(p.name);
          });
        } catch {}
      }

      this.heroInterval = setInterval(() => {
        this.activeHeroIndex = (this.activeHeroIndex + 1) % this.heroImages.length;
      }, 4500);

      this.productInterval = setInterval(() => {
        this.products.forEach(p => {
          p.currentImage = (p.currentImage + 1) % p.images.length;
        });
      }, 3500);

      this.initScrollProgress();
    }
  }

  ngOnDestroy(): void {
    clearInterval(this.heroInterval);
    clearInterval(this.productInterval);
  }

  // ══════════════════════════════════════════════════════
  // Scroll Progress
  // ══════════════════════════════════════════════════════

  @HostListener('window:scroll')
  onScroll(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    const el = document.getElementById('scrollProgress');
    if (!el) return;
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    el.style.width = docHeight > 0 ? `${(scrollTop / docHeight) * 100}%` : '0%';
  }

  initScrollProgress(): void {
    // handled by HostListener
  }

  // ══════════════════════════════════════════════════════
  // Hero
  // ══════════════════════════════════════════════════════

  goToHeroSlide(i: number): void {
    this.activeHeroIndex = i;
  }

  scrollToShop(): void {
    const element = document.getElementById('shop');
    element?.scrollIntoView({ behavior: 'smooth' });
  }

  // ══════════════════════════════════════════════════════
  // Filters & Search
  // ══════════════════════════════════════════════════════

  setCategory(cat: string): void {
    this.activeCategory = cat;
    this.applyFilters();
  }

  clearSearch(): void {
    this.searchQuery = '';
    this.applyFilters();
  }

  resetFilters(): void {
    this.searchQuery = '';
    this.activeCategory = 'All';
    this.sortBy = 'default';
    this.filteredProducts = [...this.products];
  }

  applyFilters(): void {
    let result = [...this.products];

    // Category filter
    if (this.activeCategory !== 'All') {
      result = result.filter(p => p.type === this.activeCategory);
    }

    // Search filter
    if (this.searchQuery.trim()) {
      const q = this.searchQuery.toLowerCase();
      result = result.filter(p =>
        p.name.toLowerCase().includes(q) || p.type.toLowerCase().includes(q)
      );
    }

    // Sort
    switch (this.sortBy) {
      case 'price-asc':  result.sort((a, b) => a.price - b.price); break;
      case 'price-desc': result.sort((a, b) => b.price - a.price); break;
      case 'name':       result.sort((a, b) => a.name.localeCompare(b.name)); break;
    }

    this.filteredProducts = result;
  }

  // ══════════════════════════════════════════════════════
  // Image Navigation
  // ══════════════════════════════════════════════════════

  nextImage(i: number): void {
    const p = this.products[i];
    p.currentImage = (p.currentImage + 1) % p.images.length;
  }

  prevImage(i: number): void {
    const p = this.products[i];
    p.currentImage = (p.currentImage - 1 + p.images.length) % p.images.length;
  }

  goToImage(productIndex: number, imgIndex: number): void {
    this.products[productIndex].currentImage = imgIndex;
  }

  onTouchStart(e: TouchEvent): void {
    this.startX = e.touches[0].clientX;
  }

  onTouchEnd(e: TouchEvent, i: number): void {
    const endX = e.changedTouches[0].clientX;
    if (this.startX - endX > 50) this.nextImage(i);
    else if (endX - this.startX > 50) this.prevImage(i);
  }

  // ══════════════════════════════════════════════════════
  // Wishlist
  // ══════════════════════════════════════════════════════

  toggleWishlist(product: Product): void {
    product.wishlist = !product.wishlist;
    this.saveWishlist();
    this.showToast(
      product.wishlist ? `♥ Added to wishlist` : `♡ Removed from wishlist`,
      product.wishlist ? 'heart' : 'info'
    );
  }

  getWishlistItems(): Product[] {
    return this.products.filter(p => p.wishlist);
  }

  getWishlistCount(): number {
    return this.products.filter(p => p.wishlist).length;
  }

  toggleWishlistPanel(): void {
    this.wishlistOpen = !this.wishlistOpen;
    if (this.wishlistOpen) this.cartOpen = false;
  }

  saveWishlist(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    const names = this.products.filter(p => p.wishlist).map(p => p.name);
    localStorage.setItem('cuteCraftsWishlist', JSON.stringify(names));
  }

  // ══════════════════════════════════════════════════════
  // Cart
  // ══════════════════════════════════════════════════════

  addToCart(product: Product): void {
    // Match by index (unique), not just name
    const existing = this.cart.find(item => item.name === product.name && item.image === product.images[0]);

    if (existing) {
      existing.quantity++;
    } else {
      this.cart.push({
        name: product.name,
        price: product.price,
        quantity: 1,
        image: product.images[0],
        type: product.type
      });
    }

    this.saveCart();
    this.triggerCartBounce();
    this.showToast(`🛒 ${product.name} added to cart!`, 'success');
  }

  increaseQty(i: number): void {
    this.cart[i].quantity++;
    this.saveCart();
  }

  decreaseQty(i: number): void {
    if (this.cart[i].quantity > 1) {
      this.cart[i].quantity--;
    } else {
      this.cart.splice(i, 1);
    }
    this.saveCart();
  }

  removeFromCart(i: number): void {
    const name = this.cart[i].name;
    this.cart.splice(i, 1);
    this.saveCart();
    this.showToast(`Removed ${name}`, 'info');
  }

  clearCart(): void {
    this.cart = [];
    this.saveCart();
    this.showToast('Cart cleared', 'info');
  }

  getTotal(): number {
    return this.cart.reduce((t, item) => t + item.price * item.quantity, 0);
  }

  getCartCount(): number {
    return this.cart.reduce((t, item) => t + item.quantity, 0);
  }

  toggleCart(): void {
    this.cartOpen = !this.cartOpen;
    if (this.cartOpen) this.wishlistOpen = false;
  }

  closeAllPanels(): void {
    this.cartOpen = false;
    this.wishlistOpen = false;
  }

  saveCart(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    localStorage.setItem('cuteCraftsCart', JSON.stringify(this.cart));
  }

  triggerCartBounce(): void {
    this.cartBounce = true;
    setTimeout(() => this.cartBounce = false, 600);
  }

  // ══════════════════════════════════════════════════════
  // WhatsApp Order
  // ══════════════════════════════════════════════════════

  orderOnWhatsApp(): void {
    if (!this.cart.length) return;

    let message = 'Hello! I would like to order:%0A%0A';

    this.cart.forEach(item => {
      message += `• ${item.name} (${item.type}) x ${item.quantity} — ₹${item.price * item.quantity}%0A`;
    });

    message += `%0A*Total: ₹${this.getTotal()}*%0A%0APlease confirm availability. Thank you! 🙏`;

    window.open(`https://wa.me/917717780275?text=${message}`, '_blank');
  }

  // ══════════════════════════════════════════════════════
  // Toast Notifications
  // ══════════════════════════════════════════════════════

  showToast(message: string, type: 'success' | 'info' | 'heart' = 'success'): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    container.appendChild(toast);

    requestAnimationFrame(() => toast.classList.add('show'));

    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 400);
    }, 2800);
  }
}