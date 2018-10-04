import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.css']
})
export class TrackComponent implements OnInit {
  displayPlaying = false;
  displayMusic = true;

  constructor() { }

  ngOnInit() {

  }

  onMouseEnter() {
    this.displayPlaying = true;
    this.displayMusic = false;
  }

  onMouseLeave() {
    this.displayPlaying = false;
    this.displayMusic = true;
  }

}
