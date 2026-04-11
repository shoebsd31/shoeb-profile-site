import { Component, inject, OnInit, signal } from '@angular/core';
import { ContentService, ContactInfo } from '../../../../core/services/content.service';
import { ScrollAnimateDirective } from '../../../../shared/directives/scroll-animate.directive';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ScrollAnimateDirective],
  template: `
    <section id="contact" class="py-24 relative" appScrollAnimate>
      <div class="mx-auto max-w-4xl px-6 text-center">
        <h2 class="text-3xl md:text-4xl font-bold mb-4" style="font-family: 'Space Grotesk', system-ui, sans-serif;">
          <span class="gradient-text">Let's Connect</span>
        </h2>
        <div class="w-16 h-1 bg-gradient-to-r from-[#8b5cf6] to-[#06b6d4] rounded-full mb-8 mx-auto"></div>

        <p class="text-white/60 mb-12 max-w-lg mx-auto leading-relaxed">
          I'm always open to discussing new opportunities, interesting projects,
          or just having a great conversation about technology and innovation.
        </p>

        @if (contact(); as c) {
          <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-3xl mx-auto mb-12">
            <a [href]="'mailto:' + c.email"
              class="glass rounded-2xl p-5 card-hover flex items-center gap-3 group">
              <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-[#8b5cf6]/20 to-[#06b6d4]/20 flex items-center justify-center shrink-0">
                <svg class="w-5 h-5 text-[#a78bfa] group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
              </div>
              <div class="text-left">
                <p class="text-xs text-white/40 mb-0.5">Email</p>
                <p class="text-sm text-white/80 group-hover:text-white transition-colors">{{ c.email }}</p>
              </div>
            </a>

            <a [href]="c.linkedin" target="_blank" rel="noopener"
              class="glass rounded-2xl p-5 card-hover flex items-center gap-3 group">
              <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-[#8b5cf6]/20 to-[#06b6d4]/20 flex items-center justify-center shrink-0">
                <svg class="w-5 h-5 text-[#22d3ee] group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </div>
              <div class="text-left">
                <p class="text-xs text-white/40 mb-0.5">LinkedIn</p>
                <p class="text-sm text-white/80 group-hover:text-white transition-colors">shoebsayyed</p>
              </div>
            </a>

            <a [href]="c.github" target="_blank" rel="noopener"
              class="glass rounded-2xl p-5 card-hover flex items-center gap-3 group">
              <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-[#8b5cf6]/20 to-[#06b6d4]/20 flex items-center justify-center shrink-0">
                <svg class="w-5 h-5 text-[#a78bfa] group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </div>
              <div class="text-left">
                <p class="text-xs text-white/40 mb-0.5">GitHub</p>
                <p class="text-sm text-white/80 group-hover:text-white transition-colors">shoebsd31</p>
              </div>
            </a>

            <a [href]="c.portfolio" target="_blank" rel="noopener"
              class="glass rounded-2xl p-5 card-hover flex items-center gap-3 group">
              <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-[#06b6d4]/20 to-[#8b5cf6]/20 flex items-center justify-center shrink-0">
                <svg class="w-5 h-5 text-[#22d3ee] group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"/>
                </svg>
              </div>
              <div class="text-left">
                <p class="text-xs text-white/40 mb-0.5">Portfolio</p>
                <p class="text-sm text-white/80 group-hover:text-white transition-colors">shoeb.io</p>
              </div>
            </a>

            <a [href]="c.blog" target="_blank" rel="noopener"
              class="glass rounded-2xl p-5 card-hover flex items-center gap-3 group">
              <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-[#06b6d4]/20 to-[#8b5cf6]/20 flex items-center justify-center shrink-0">
                <svg class="w-5 h-5 text-[#a78bfa] group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z"/>
                </svg>
              </div>
              <div class="text-left">
                <p class="text-xs text-white/40 mb-0.5">Medium</p>
                <p class="text-sm text-white/80 group-hover:text-white transition-colors">&#64;shoebsd31</p>
              </div>
            </a>
          </div>

          <div class="glass rounded-full px-6 py-3 inline-flex items-center gap-2 text-white/50 text-sm">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
            </svg>
            {{ c.location }}
          </div>
        }
      </div>
    </section>
  `,
})
export class ContactComponent implements OnInit {
  private contentService = inject(ContentService);
  contact = signal<ContactInfo | null>(null);

  ngOnInit(): void {
    this.contentService.getContact().subscribe(data => this.contact.set(data));
  }
}
