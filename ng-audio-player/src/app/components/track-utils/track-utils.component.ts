import { Component, OnInit, Input } from '@angular/core';
import { AudioDataService } from './../../services/audio-data.service';

@Component({
  selector: 'app-track-utils',
  templateUrl: './track-utils.component.html',
  styleUrls: ['./track-utils.component.css']
})
export class TrackUtilsComponent implements OnInit {
  
  @Input() isPlaying: boolean;
  @Input() loaded: boolean;
  @Input() audioBuffer: object;

  constructor(private audioData: AudioDataService) { 
     
  }

  ngOnInit() {
  }

}
