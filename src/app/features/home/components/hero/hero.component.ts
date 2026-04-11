import { Component, signal, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-hero',
  standalone: true,
  template: `
    <section id="hero" class="relative min-h-screen flex items-center justify-center overflow-hidden">
      <!-- Background orbs -->
      <div class="orb orb-1"></div>
      <div class="orb orb-2"></div>
      <div class="orb orb-3"></div>

      <!-- Grid pattern overlay -->
      <div class="absolute inset-0 opacity-[0.03]"
        style="background-image: radial-gradient(circle at 1px 1px, white 1px, transparent 0); background-size: 40px 40px;">
      </div>

      <div class="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <!-- Status badge -->
        <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8 animate-[fadeIn_1s_ease_0.2s_both]">
          <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span class="text-sm text-white/70">Available for opportunities</span>
        </div>

        <!-- Name -->
        <h1 class="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight mb-6 animate-[fadeIn_1s_ease_0.4s_both]"
          style="font-family: 'Space Grotesk', system-ui, sans-serif;">
          <span class="text-white">Shoeb</span>
          <span class="gradient-text"> Sayyed</span>
        </h1>

        <!-- Typing title -->
        <div class="h-8 mb-8 animate-[fadeIn_1s_ease_0.6s_both]">
          <p class="text-lg md:text-xl text-white/60 font-mono" style="font-family: 'JetBrains Mono', monospace;">
            {{ displayedText() }}<span class="typing-cursor"></span>
          </p>
        </div>

        <!-- Subtitle -->
        <p class="text-base md:text-lg text-white/50 max-w-2xl mx-auto mb-12 leading-relaxed animate-[fadeIn_1s_ease_0.8s_both]">
          Solutions Architect at the International Atomic Energy Agency, building intelligent systems
          that transform how organizations work.
        </p>

        <!-- CTA buttons -->
        <div class="flex flex-col sm:flex-row items-center justify-center gap-4 animate-[fadeIn_1s_ease_1s_both]">
          <a href="#experience"
            class="group px-8 py-3 rounded-full bg-gradient-to-r from-[#8b5cf6] to-[#06b6d4] text-white font-semibold text-sm hover:shadow-lg hover:shadow-[#8b5cf6]/25 transition-all duration-300 hover:scale-105">
            View My Work
            <span class="inline-block ml-1 transition-transform group-hover:translate-x-1">&rarr;</span>
          </a>
          <a href="#contact"
            class="px-8 py-3 rounded-full glass text-white/80 font-semibold text-sm hover:text-white hover:border-white/20 transition-all duration-300">
            Get In Touch
          </a>
        </div>

        <!-- Scroll indicator -->
        <div class="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <svg class="w-5 h-5 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"/>
          </svg>
        </div>
      </div>
    </section>
  `,
  styles: [`
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `]
})
export class HeroComponent implements OnInit, OnDestroy {
  private titles = [
    'AI | Web | Architect | Cloud | Automation',
    'Solutions Architect @ IAEA',
    'Building Intelligent Systems',
    'Cloud & AI Specialist',
  ];
  private titleIndex = 0;
  private charIndex = 0;
  private isDeleting = false;
  private timer: ReturnType<typeof setTimeout> | null = null;

  displayedText = signal('');

  ngOnInit(): void {
    this.type();
  }

  ngOnDestroy(): void {
    if (this.timer) clearTimeout(this.timer);
  }

  private type(): void {
    const currentTitle = this.titles[this.titleIndex];

    if (!this.isDeleting) {
      this.displayedText.set(currentTitle.substring(0, this.charIndex + 1));
      this.charIndex++;

      if (this.charIndex === currentTitle.length) {
        this.isDeleting = true;
        this.timer = setTimeout(() => this.type(), 2000);
        return;
      }
    } else {
      this.displayedText.set(currentTitle.substring(0, this.charIndex - 1));
      this.charIndex--;

      if (this.charIndex === 0) {
        this.isDeleting = false;
        this.titleIndex = (this.titleIndex + 1) % this.titles.length;
      }
    }

    const speed = this.isDeleting ? 30 : 60;
    this.timer = setTimeout(() => this.type(), speed);
  }
}
