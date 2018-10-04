import { Component, OnInit } from '@angular/core';
import { AudioDataService } from './services/audio-data.service';
import { Observable } from 'rxjs';
import { AudioControlsComponent } from './components/audio-controls/audio-controls.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'player';
  audio: any;
  ctx: any;
  plugWalk: string = '5b8cbe02bfe0293e70ef6913';

  constructor(public audioData: AudioDataService ) {

  }

  ngOnInit() {
   
  }

}
