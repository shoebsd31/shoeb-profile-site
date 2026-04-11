import { Component, inject, OnInit, signal } from '@angular/core';
import { ContentService, Experience } from '../../../../core/services/content.service';
import { ScrollAnimateDirective } from '../../../../shared/directives/scroll-animate.directive';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [ScrollAnimateDirective],
  template: `
    <section id="experience" class="py-24 relative" appScrollAnimate>
      <div class="mx-auto max-w-6xl px-6">
        <h2 class="text-3xl md:text-4xl font-bold mb-4" style="font-family: 'Space Grotesk', system-ui, sans-serif;">
          <span class="gradient-text">Experience</span>
        </h2>
        <div class="w-16 h-1 bg-gradient-to-r from-[#8b5cf6] to-[#06b6d4] rounded-full mb-12"></div>

        <div class="relative">
          <!-- Timeline line -->
          <div class="hidden md:block timeline-line"></div>

          <div class="space-y-12">
            @for (exp of experiences(); track exp.company + $index; let i = $index) {
              @for (role of exp.roles; track role.title; let j = $index) {
                <div class="relative grid md:grid-cols-2 gap-8 items-start"
                  [class]="(i * 10 + j) % 2 === 0 ? 'md:text-right' : ''">

                  <!-- Timeline dot -->
                  <div class="hidden md:block absolute left-1/2 top-8 w-4 h-4 rounded-full bg-gradient-to-r from-[#8b5cf6] to-[#06b6d4] -translate-x-1/2 z-10 ring-4 ring-[#0a0a0f]"></div>

                  @if ((i * 10 + j) % 2 === 0) {
                    <!-- Left side content -->
                    <div class="glass rounded-2xl p-6 card-hover">
                      <div class="flex items-center gap-2 mb-2" [class]="'md:justify-end'">
                        <span class="text-xs px-3 py-1 rounded-full bg-[#8b5cf6]/10 text-[#a78bfa] border border-[#8b5cf6]/20">
                          {{ role.duration }}
                        </span>
                      </div>
                      <h3 class="text-lg font-bold text-white mb-1">{{ role.title }}</h3>
                      <p class="text-[#06b6d4] font-medium text-sm mb-1">{{ exp.company }}</p>
                      <p class="text-white/40 text-xs mb-4">{{ role.location }} &middot; {{ role.period }}</p>
                      <ul class="space-y-2 text-left">
                        @for (h of role.highlights; track h) {
                          <li class="text-sm text-white/60 flex items-start gap-2">
                            <span class="w-1.5 h-1.5 rounded-full bg-[#8b5cf6] mt-1.5 shrink-0"></span>
                            {{ h }}
                          </li>
                        }
                      </ul>
                    </div>
                    <!-- Right side spacer -->
                    <div></div>
                  } @else {
                    <!-- Left spacer -->
                    <div></div>
                    <!-- Right side content -->
                    <div class="glass rounded-2xl p-6 card-hover">
                      <div class="flex items-center gap-2 mb-2">
                        <span class="text-xs px-3 py-1 rounded-full bg-[#06b6d4]/10 text-[#22d3ee] border border-[#06b6d4]/20">
                          {{ role.duration }}
                        </span>
                      </div>
                      <h3 class="text-lg font-bold text-white mb-1">{{ role.title }}</h3>
                      <p class="text-[#8b5cf6] font-medium text-sm mb-1">{{ exp.company }}</p>
                      <p class="text-white/40 text-xs mb-4">{{ role.location }} &middot; {{ role.period }}</p>
                      <ul class="space-y-2">
                        @for (h of role.highlights; track h) {
                          <li class="text-sm text-white/60 flex items-start gap-2">
                            <span class="w-1.5 h-1.5 rounded-full bg-[#06b6d4] mt-1.5 shrink-0"></span>
                            {{ h }}
                          </li>
                        }
                      </ul>
                    </div>
                  }
                </div>
              }
            }
          </div>
        </div>
      </div>
    </section>
  `,
})
export class ExperienceComponent implements OnInit {
  private contentService = inject(ContentService);
  experiences = signal<Experience[]>([]);

  ngOnInit(): void {
    this.contentService.getExperience().subscribe(data => {
      this.experiences.set(data);
    });
  }
}
