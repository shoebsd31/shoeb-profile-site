import { Component } from '@angular/core';
import { HeroComponent } from './components/hero/hero.component';
import { AboutComponent } from './components/about/about.component';
import { ExperienceComponent } from './components/experience/experience.component';
import { SkillsComponent } from './components/skills/skills.component';
import { CertificationsComponent } from './components/certifications/certifications.component';
import { ContactComponent } from './components/contact/contact.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeroComponent,
    AboutComponent,
    ExperienceComponent,
    SkillsComponent,
    CertificationsComponent,
    ContactComponent,
  ],
  template: `
    <app-hero />
    <app-about />
    <app-experience />
    <app-skills />
    <app-certifications />
    <app-contact />
  `,
})
export class HomeComponent {}
