import { Directive, ElementRef, inject, OnInit, OnDestroy } from '@angular/core';

@Directive({
  selector: '[appScrollAnimate]',
  standalone: true
})
export class ScrollAnimateDirective implements OnInit, OnDestroy {
  private el = inject(ElementRef);
  private observer!: IntersectionObserver;

  ngOnInit(): void {
    this.el.nativeElement.classList.add('section-animate');

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    this.observer.observe(this.el.nativeElement);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
