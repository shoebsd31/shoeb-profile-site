import { Injectable, inject } from '@angular/core';
import { forkJoin } from 'rxjs';
import { jsPDF } from 'jspdf';
import {
  ContentService,
  Experience,
  SkillsData,
  Certification,
  Education,
  ContactInfo,
} from './content.service';

@Injectable({ providedIn: 'root' })
export class ResumeService {
  private content = inject(ContentService);

  private readonly PAGE_WIDTH = 210;
  private readonly MARGIN_LEFT = 18;
  private readonly MARGIN_RIGHT = 18;
  private readonly MARGIN_TOP = 18;
  private readonly MARGIN_BOTTOM = 18;
  private readonly CONTENT_WIDTH = 210 - 18 - 18; // PAGE_WIDTH - margins

  generateResume(): void {
    forkJoin({
      experience: this.content.getExperience(),
      skills: this.content.getSkills(),
      certifications: this.content.getCertifications(),
      education: this.content.getEducation(),
      contact: this.content.getContact(),
    }).subscribe(({ experience, skills, certifications, education, contact }) => {
      const doc = new jsPDF('p', 'mm', 'a4');
      let y = this.MARGIN_TOP;

      y = this.addHeader(doc, contact, y);
      y = this.addSummary(doc, y);
      y = this.addSkills(doc, skills, y);
      y = this.addExperience(doc, experience, y);
      y = this.addEducation(doc, education, y);
      y = this.addCertifications(doc, certifications, y);

      doc.save('Shoeb_Sayyed_Resume.pdf');
    });
  }

  private checkPageBreak(doc: jsPDF, y: number, needed: number): number {
    if (y + needed > 297 - this.MARGIN_BOTTOM) {
      doc.addPage();
      return this.MARGIN_TOP;
    }
    return y;
  }

  private addHeader(doc: jsPDF, contact: ContactInfo, y: number): number {
    // Name
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(22);
    doc.setTextColor(30, 30, 30);
    doc.text('SHOEB SAYYED', this.PAGE_WIDTH / 2, y, { align: 'center' });
    y += 7;

    // Title
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(11);
    doc.setTextColor(80, 80, 80);
    doc.text('Solutions Architect', this.PAGE_WIDTH / 2, y, { align: 'center' });
    y += 6;

    // Contact line
    doc.setFontSize(8.5);
    doc.setTextColor(100, 100, 100);
    const contactLine = `${contact.location}  |  ${contact.email}  |  linkedin.com/in/shoebsayyed  |  github.com/shoebsd31`;
    doc.text(contactLine, this.PAGE_WIDTH / 2, y, { align: 'center' });
    y += 4;

    // Divider
    this.addDivider(doc, y);
    y += 5;

    return y;
  }

  private addSummary(doc: jsPDF, y: number): number {
    y = this.addSectionTitle(doc, 'PROFESSIONAL SUMMARY', y);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(50, 50, 50);

    const summary =
      'Solutions Architect with over 14 years of experience building applications across desktop, web, and mobile platforms. ' +
      'Currently spearheading AI initiatives at the International Atomic Energy Agency (IAEA), contributing to multiple high-impact projects. ' +
      'Expertise in Azure, Power Platform, .NET, and cloud services with a focus on AI-driven automation. ' +
      'Champion of test-driven development with a security-first mindset. Believes in adopting AI purposefully \u2014 only where it adds genuine value.';

    const lines = doc.splitTextToSize(summary, this.CONTENT_WIDTH);
    doc.text(lines, this.MARGIN_LEFT, y);
    y += lines.length * 4 + 4;

    return y;
  }

  private addSkills(doc: jsPDF, skills: SkillsData, y: number): number {
    y = this.checkPageBreak(doc, y, 30);
    y = this.addSectionTitle(doc, 'TECHNICAL SKILLS', y);

    doc.setFontSize(9);
    for (const category of skills.categories) {
      y = this.checkPageBreak(doc, y, 8);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(50, 50, 50);
      doc.text(`${category.name}: `, this.MARGIN_LEFT, y);

      const labelWidth = doc.getTextWidth(`${category.name}: `);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(70, 70, 70);
      const skillText = category.skills.join(', ');
      const skillLines = doc.splitTextToSize(skillText, this.CONTENT_WIDTH - labelWidth);

      // First line after label
      doc.text(skillLines[0], this.MARGIN_LEFT + labelWidth, y);
      // Remaining lines indented
      for (let i = 1; i < skillLines.length; i++) {
        y += 4;
        doc.text(skillLines[i], this.MARGIN_LEFT + labelWidth, y);
      }
      y += 5;
    }

    return y;
  }

  private addExperience(doc: jsPDF, experience: Experience[], y: number): number {
    y = this.checkPageBreak(doc, y, 20);
    y = this.addSectionTitle(doc, 'PROFESSIONAL EXPERIENCE', y);

    for (const company of experience) {
      for (const role of company.roles) {
        y = this.checkPageBreak(doc, y, 18);

        // Role title and company
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(9.5);
        doc.setTextColor(30, 30, 30);
        doc.text(`${role.title}`, this.MARGIN_LEFT, y);

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(9);
        doc.setTextColor(100, 100, 100);
        doc.text(`${role.period}`, this.PAGE_WIDTH - this.MARGIN_RIGHT, y, { align: 'right' });
        y += 4.5;

        doc.setFont('helvetica', 'italic');
        doc.setFontSize(9);
        doc.setTextColor(70, 70, 70);
        doc.text(`${company.company}  \u2022  ${role.location}`, this.MARGIN_LEFT, y);
        y += 5;

        // Highlights
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8.5);
        doc.setTextColor(60, 60, 60);
        for (const highlight of role.highlights) {
          y = this.checkPageBreak(doc, y, 8);
          const bulletText = `\u2022  ${highlight}`;
          const lines = doc.splitTextToSize(bulletText, this.CONTENT_WIDTH - 4);
          doc.text(lines, this.MARGIN_LEFT + 4, y);
          y += lines.length * 3.8 + 1;
        }
        y += 3;
      }
    }

    return y;
  }

  private addEducation(doc: jsPDF, education: Education[], y: number): number {
    y = this.checkPageBreak(doc, y, 20);
    y = this.addSectionTitle(doc, 'EDUCATION', y);

    for (const edu of education) {
      y = this.checkPageBreak(doc, y, 10);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9.5);
      doc.setTextColor(30, 30, 30);
      doc.text(`${edu.degree} in ${edu.field}`, this.MARGIN_LEFT, y);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.setTextColor(100, 100, 100);
      doc.text(edu.period, this.PAGE_WIDTH - this.MARGIN_RIGHT, y, { align: 'right' });
      y += 4.5;

      doc.setFont('helvetica', 'italic');
      doc.setTextColor(70, 70, 70);
      doc.text(edu.institution, this.MARGIN_LEFT, y);
      y += 7;
    }

    return y;
  }

  private addCertifications(doc: jsPDF, certifications: Certification[], y: number): number {
    y = this.checkPageBreak(doc, y, 20);
    y = this.addSectionTitle(doc, 'CERTIFICATIONS', y);

    doc.setFontSize(8.5);

    // Group by year for cleaner layout
    for (const cert of certifications) {
      y = this.checkPageBreak(doc, y, 6);

      doc.setFont('helvetica', 'normal');
      doc.setTextColor(50, 50, 50);

      const certLine = `\u2022  ${cert.name}`;
      const lines = doc.splitTextToSize(certLine, this.CONTENT_WIDTH - 30);
      doc.text(lines, this.MARGIN_LEFT + 4, y);

      if (cert.date) {
        doc.setTextColor(100, 100, 100);
        doc.text(cert.date, this.PAGE_WIDTH - this.MARGIN_RIGHT, y, { align: 'right' });
      }

      y += lines.length * 3.8 + 1.2;
    }

    return y;
  }

  private addSectionTitle(doc: jsPDF, title: string, y: number): number {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(40, 40, 40);
    doc.text(title, this.MARGIN_LEFT, y);
    y += 1.5;
    this.addDivider(doc, y);
    y += 5;
    return y;
  }

  private addDivider(doc: jsPDF, y: number): void {
    doc.setDrawColor(180, 180, 180);
    doc.setLineWidth(0.3);
    doc.line(this.MARGIN_LEFT, y, this.PAGE_WIDTH - this.MARGIN_RIGHT, y);
  }
}
