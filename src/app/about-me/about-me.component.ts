import { Component } from '@angular/core';
import { Tile } from './tile.model';

@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.css'],
  standalone: true
})
export class AboutMeComponent {
  tiles: Tile[] = [
    new Tile('Summary', "linear-gradient(lightgrey, white)", `My name is Matias Galante. I'm originally from Argentina and I came to the U.S. when I was a kid with my family. I grew up in Utah ever since and later became a U.S. citizen. I've recently graduated from Utah Valley University with a Bachelor in Computer Science and am looking forward to applying my skills in a work environment. I have skills in using Typescript/Javascript, HTML, CSS, Angular and Node.js. My greatest achievement in software is creating a compiler for a C/C++ like language in Node.js.`),
    //new Tile('Hobbies/Interests', 4, 1, "linear-gradient(white, lightgrey, white)", ''),
  ];
}