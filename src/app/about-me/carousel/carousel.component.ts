import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Slide } from '../slide.model';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css'],
  animations: [
    trigger('carouselAnimation', [
      transition('void => *', [
        style({ opacity: 0 }),
        animate('300ms', style({ opacity: 1 }))
      ]),
      transition('* => void', [
        animate('300ms', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class CarouselComponent implements OnInit, OnDestroy {
  @Input() slides: Slide[] = [];
  public currentSlide = 0;
  private intervalId: any;

  constructor() { }

  ngOnInit() {
    /*this.intervalId = setInterval(() => {
      this.onNextClick();
    }, 5000);*/
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
  }

  onPreviousClick() {
    const previous = this.currentSlide - 1;
    this.currentSlide = previous < 0 ? this.slides.length - 1 : previous;
    //console.log("previous clicked, new current slide is: ", this.currentSlide);
  }

  onNextClick() {
    const next = this.currentSlide + 1;
    this.currentSlide = next === this.slides.length ? 0 : next;
    //console.log("next clicked, new slide is: ", this.currentSlide);
  }
}
