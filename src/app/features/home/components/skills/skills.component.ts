import { Component, inject, OnInit, signal } from '@angular/core';
import { ContentService, SkillCategory } from '../../../../core/services/content.service';
import { ScrollAnimateDirective } from '../../../../shared/directives/scroll-animate.directive';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [ScrollAnimateDirective],
  template: `
    <section id="skills" class="py-24 relative" appScrollAnimate>
      <div class="mx-auto max-w-6xl px-6">
        <h2 class="text-3xl md:text-4xl font-bold mb-4" style="font-family: 'Space Grotesk', system-ui, sans-serif;">
          <span class="gradient-text">Skills & Technologies</span>
        </h2>
        <div class="w-16 h-1 bg-gradient-to-r from-[#8b5cf6] to-[#06b6d4] rounded-full mb-12"></div>

        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          @for (category of categories(); track category.name) {
            <div class="glass rounded-2xl p-6 card-hover">
              <div class="flex items-center gap-3 mb-5">
                <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-[#8b5cf6]/20 to-[#06b6d4]/20 flex items-center justify-center">
                  <span class="text-lg">{{ getIcon(category.icon) }}</span>
                </div>
                <h3 class="text-base font-bold text-white">{{ category.name }}</h3>
              </div>
              <div class="flex flex-wrap gap-2">
                @for (skill of category.skills; track skill) {
                  <span class="skill-tag text-xs px-3 py-1.5 rounded-full border border-white/10 text-white/70 bg-white/[0.03] cursor-default">
                    {{ skill }}
                  </span>
                }
              </div>
            </div>
          }
        </div>
      </div>
    </section>
  `,
})
export class SkillsComponent implements OnInit {
  private contentService = inject(ContentService);
  categories = signal<SkillCategory[]>([]);

  ngOnInit(): void {
    this.contentService.getSkills().subscribe(data => {
      this.categories.set(data.categories);
    });
  }

  getIcon(icon: string): string {
    const icons: Record<string, string> = {
      brain: '🧠',
      cloud: '☁️',
      server: '⚙️',
      layout: '🖥️',
      chart: '📊',
      architecture: '🏗️',
    };
    return icons[icon] || '💡';
  }
}
