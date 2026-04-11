import { Component, inject, OnInit, signal } from '@angular/core';
import { ContentService } from '../../../../core/services/content.service';
import { ScrollAnimateDirective } from '../../../../shared/directives/scroll-animate.directive';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [ScrollAnimateDirective],
  template: `
    <section id="about" class="py-24 relative" appScrollAnimate>
      <div class="mx-auto max-w-6xl px-6">
        <h2 class="text-3xl md:text-4xl font-bold mb-4" style="font-family: 'Space Grotesk', system-ui, sans-serif;">
          <span class="gradient-text">About Me</span>
        </h2>
        <div class="w-16 h-1 bg-gradient-to-r from-[#8b5cf6] to-[#06b6d4] rounded-full mb-12"></div>

        <div class="grid md:grid-cols-3 gap-8">
          <!-- Main about text -->
          <div class="md:col-span-2">
            <div class="glass rounded-2xl p-8 card-hover">
              <p class="text-white/70 leading-relaxed mb-4">
                I'm a Solutions Architect with over <span class="text-white font-semibold">14 years of experience</span>
                developing applications across desktop, web, and mobile platforms.
              </p>
              <p class="text-white/70 leading-relaxed mb-4">
                Currently working at the <span class="text-[#8b5cf6] font-semibold">International Atomic Energy Agency (IAEA)</span>
                on multiple high-impact projects. I bring deep expertise in cloud technologies (primarily Azure and AWS),
                AI-powered solutions, and enterprise automation.
              </p>
              <p class="text-white/70 leading-relaxed">
                I'm a strong advocate for software quality through automated testing and test-driven development,
                and I believe in implementing AI-based automation wherever it creates genuine value.
              </p>
            </div>
          </div>

          <!-- Quick stats -->
          <div class="flex flex-col gap-4">
            @for (stat of stats; track stat.label) {
              <div class="glass rounded-2xl p-6 card-hover text-center">
                <p class="text-3xl font-bold gradient-text mb-1" style="font-family: 'Space Grotesk', system-ui, sans-serif;">{{ stat.value }}</p>
                <p class="text-sm text-white/50">{{ stat.label }}</p>
              </div>
            }
          </div>
        </div>
      </div>
    </section>
  `,
})
export class AboutComponent {
  stats = [
    { value: '14+', label: 'Years Experience' },
    { value: '8', label: 'Companies' },
    { value: '26', label: 'Certifications' },
    { value: '5', label: 'Languages Spoken' },
  ];
}
