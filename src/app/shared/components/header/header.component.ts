import { Component, signal, HostListener } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  template: `
    <header
      class="fixed top-0 z-50 w-full transition-all duration-500"
      [class]="scrolled() ? 'glass shadow-lg shadow-black/20' : 'bg-transparent'">
      <div class="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <a href="#hero" class="group flex items-center gap-2">
          <span class="text-xl font-bold tracking-tight" style="font-family: 'Space Grotesk', system-ui, sans-serif;">
            <span class="gradient-text">S</span><span class="text-white/90">hoeb</span>
          </span>
        </a>
        <nav class="hidden md:flex items-center gap-8">
          @for (item of navItems; track item.label) {
            <a
              [href]="item.href"
              class="text-sm text-white/60 hover:text-white transition-colors duration-300 relative after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-0 after:bg-gradient-to-r after:from-[#8b5cf6] after:to-[#06b6d4] after:transition-all after:duration-300 hover:after:w-full">
              {{ item.label }}
            </a>
          }
        </nav>
        <button
          (click)="mobileMenuOpen.set(!mobileMenuOpen())"
          class="md:hidden text-white/80 hover:text-white transition-colors p-2">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            @if (mobileMenuOpen()) {
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            } @else {
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
            }
          </svg>
        </button>
      </div>
      @if (mobileMenuOpen()) {
        <nav class="md:hidden glass border-t border-white/5 px-6 py-4 flex flex-col gap-4">
          @for (item of navItems; track item.label) {
            <a
              [href]="item.href"
              (click)="mobileMenuOpen.set(false)"
              class="text-sm text-white/70 hover:text-white transition-colors py-2">
              {{ item.label }}
            </a>
          }
        </nav>
      }
    </header>
  `,
})
export class HeaderComponent {
  scrolled = signal(false);
  mobileMenuOpen = signal(false);

  navItems = [
    { label: 'About', href: '#about' },
    { label: 'Experience', href: '#experience' },
    { label: 'Skills', href: '#skills' },
    { label: 'Education', href: '#education' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' },
  ];

  @HostListener('window:scroll')
  onScroll(): void {
    this.scrolled.set(window.scrollY > 50);
  }
}
