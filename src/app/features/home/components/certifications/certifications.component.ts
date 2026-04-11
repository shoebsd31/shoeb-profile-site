import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { ContentService, Certification, Education } from '../../../../core/services/content.service';
import { ScrollAnimateDirective } from '../../../../shared/directives/scroll-animate.directive';

@Component({
  selector: 'app-certifications',
  standalone: true,
  imports: [ScrollAnimateDirective],
  template: `
    <section id="education" class="py-24 relative" appScrollAnimate>
      <div class="mx-auto max-w-6xl px-6">
        <div class="grid md:grid-cols-2 gap-16">
          <!-- Certifications -->
          <div>
            <div class="flex items-end justify-between mb-4">
              <h2 class="text-3xl md:text-4xl font-bold" style="font-family: 'Space Grotesk', system-ui, sans-serif;">
                <span class="gradient-text">Certifications</span>
              </h2>
              <span class="text-sm text-white/30 font-mono">{{ certifications().length }}</span>
            </div>
            <div class="w-16 h-1 bg-gradient-to-r from-[#8b5cf6] to-[#06b6d4] rounded-full mb-8"></div>

            <div class="space-y-3">
              @for (cert of visibleCerts(); track cert.name + cert.issuer) {
                <div class="glass rounded-xl p-4 card-hover flex items-start gap-3 group">
                  <div class="w-9 h-9 rounded-lg bg-gradient-to-br from-[#8b5cf6]/20 to-[#06b6d4]/20 flex items-center justify-center shrink-0 mt-0.5">
                    <svg class="w-4 h-4 text-[#a78bfa]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/>
                    </svg>
                  </div>
                  <div class="min-w-0 flex-1">
                    <h3 class="text-sm font-semibold text-white mb-0.5 leading-tight">{{ cert.name }}</h3>
                    <div class="flex items-center gap-2 flex-wrap">
                      <p class="text-xs text-white/40">{{ cert.issuer }}</p>
                      @if (cert.date) {
                        <span class="text-[10px] text-white/25">&middot;</span>
                        <p class="text-xs text-white/30">{{ cert.date }}</p>
                      }
                    </div>
                    @if (cert.skills && cert.skills.length > 0) {
                      <div class="flex flex-wrap gap-1 mt-1.5">
                        @for (skill of cert.skills; track skill) {
                          <span class="text-[10px] px-2 py-0.5 rounded-full bg-[#8b5cf6]/10 text-[#a78bfa] border border-[#8b5cf6]/15">
                            {{ skill }}
                          </span>
                        }
                      </div>
                    }
                  </div>
                </div>
              }
            </div>

            @if (certifications().length > initialCount) {
              <button
                (click)="showAllCerts.set(!showAllCerts())"
                class="mt-4 w-full py-3 rounded-xl glass text-sm text-white/60 hover:text-white transition-all duration-300 hover:border-[#8b5cf6]/30 flex items-center justify-center gap-2">
                @if (showAllCerts()) {
                  <span>Show Less</span>
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7"/>
                  </svg>
                } @else {
                  <span>Show All {{ certifications().length }} Certifications</span>
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                  </svg>
                }
              </button>
            }
          </div>

          <!-- Education -->
          <div>
            <h2 class="text-3xl md:text-4xl font-bold mb-4" style="font-family: 'Space Grotesk', system-ui, sans-serif;">
              <span class="gradient-text">Education</span>
            </h2>
            <div class="w-16 h-1 bg-gradient-to-r from-[#8b5cf6] to-[#06b6d4] rounded-full mb-8"></div>

            <div class="space-y-4">
              @for (edu of education(); track edu.institution) {
                <div class="glass rounded-xl p-5 card-hover flex items-start gap-4">
                  <div class="w-10 h-10 rounded-lg bg-gradient-to-br from-[#06b6d4]/20 to-[#8b5cf6]/20 flex items-center justify-center shrink-0 mt-0.5">
                    <svg class="w-5 h-5 text-[#22d3ee]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5z"/>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 class="text-sm font-semibold text-white mb-0.5">{{ edu.institution }}</h3>
                    <p class="text-xs text-[#06b6d4] mb-0.5">{{ edu.degree }}, {{ edu.field }}</p>
                    <p class="text-xs text-white/40">{{ edu.period }}</p>
                  </div>
                </div>
              }
            </div>

            <!-- Languages -->
            <div class="mt-8">
              <h3 class="text-lg font-bold text-white/80 mb-4" style="font-family: 'Space Grotesk', system-ui, sans-serif;">Languages</h3>
              <div class="flex flex-wrap gap-3">
                @for (lang of languages; track lang.name) {
                  <div class="glass rounded-lg px-4 py-2 text-center">
                    <p class="text-sm font-medium text-white/80">{{ lang.name }}</p>
                    <p class="text-[10px] text-white/40">{{ lang.level }}</p>
                  </div>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class CertificationsComponent implements OnInit {
  private contentService = inject(ContentService);
  certifications = signal<Certification[]>([]);
  education = signal<Education[]>([]);
  showAllCerts = signal(false);
  initialCount = 8;

  visibleCerts = computed(() => {
    const all = this.certifications();
    return this.showAllCerts() ? all : all.slice(0, this.initialCount);
  });

  languages = [
    { name: 'English', level: 'Full Professional' },
    { name: 'Hindi', level: 'Full Professional' },
    { name: 'Urdu', level: 'Full Professional' },
    { name: 'German', level: 'Limited Working' },
    { name: 'Marathi', level: 'Elementary' },
  ];

  ngOnInit(): void {
    this.contentService.getCertifications().subscribe(data => this.certifications.set(data));
    this.contentService.getEducation().subscribe(data => this.education.set(data));
  }
}
