import { Directive, ElementRef, inject, OnInit, OnDestroy } from '@angular/core';

@Directive({
  selector: '[appStaggerAnimate]',
  standalone: true
})
export class StaggerAnimateDirective implements OnInit, OnDestroy {
  private el = inject(ElementRef);
  private observer!: IntersectionObserver;

  ngOnInit(): void {
    this.el.nativeElement.classList.add('stagger-children');

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    this.observer.observe(this.el.nativeElement);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
