import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ExperienceRole {
  title: string;
  period: string;
  duration: string;
  location: string;
  highlights: string[];
}

export interface Experience {
  company: string;
  totalDuration: string;
  roles: ExperienceRole[];
}

export interface SkillCategory {
  name: string;
  icon: string;
  skills: string[];
}

export interface SkillsData {
  categories: SkillCategory[];
}

export interface Certification {
  name: string;
  issuer: string;
  date?: string;
  credentialId?: string;
  skills?: string[];
}

export interface Education {
  institution: string;
  degree: string;
  field: string;
  period: string;
}

export interface ContactInfo {
  email: string;
  linkedin: string;
  portfolio: string;
  blog: string;
  github: string;
  location: string;
}

export interface GitHubProject {
  name: string;
  description: string;
  html_url: string;
  language: string;
  topics: string[];
}

@Injectable({ providedIn: 'root' })
export class ContentService {
  private http = inject(HttpClient);

  getMarkdown(filename: string): Observable<string> {
    return this.http.get(`assets/content/${filename}`, { responseType: 'text' });
  }

  getExperience(): Observable<Experience[]> {
    return this.http.get<Experience[]>('assets/content/experience.json');
  }

  getSkills(): Observable<SkillsData> {
    return this.http.get<SkillsData>('assets/content/skills.json');
  }

  getCertifications(): Observable<Certification[]> {
    return this.http.get<Certification[]>('assets/content/certifications.json');
  }

  getEducation(): Observable<Education[]> {
    return this.http.get<Education[]>('assets/content/education.json');
  }

  getContact(): Observable<ContactInfo> {
    return this.http.get<ContactInfo>('assets/content/contact.json');
  }

  getGitHubProjects(): Observable<GitHubProject[]> {
    return this.http.get<GitHubProject[]>('assets/content/github-projects.json');
  }
}
