import { Component } from '@angular/core';
import { Slide } from './slide.model';
import { Tile } from './tile.model';

@Component({
    selector: 'app-about-me',
    templateUrl: './about-me.component.html',
    styleUrls: ['./about-me.component.css'],
    standalone: false
})
export class AboutMeComponent {
  public tiles: Tile[] = [
    new Tile('Summary', "linear-gradient(lightgrey, white)", `My name is Matias Galante. I'm originally from Argentina and I came to the U.S. when I was a kid with my family. I grew up in Utah ever since and later became a U.S. citizen. I've recently graduated from Utah Valley University with a Bachelor in Computer Science and am looking forward to applying my skills in a work environment. I have skills in using Typescript/Javascript, HTML, CSS, Angular and Node.js. My greatest achievement in software is creating a compiler for a C/C++ like language in Node.js.`),
    new Tile('Carousel', "linear-gradient(white, lightgrey, white)", ''),
    //new Tile('Hobbies/Interests', 4, 1, "linear-gradient(white, lightgrey, white)", ''),
  ];

  public slides: Slide[] = [
    new Slide("https://cdn.shopify.com/s/files/1/1582/4389/products/og_1024x.jpg?v=1603745301"),
    new Slide("https://media-cdn.tripadvisor.com/media/photo-p/18/28/0d/2c/chip.jpg"),
  ];
}