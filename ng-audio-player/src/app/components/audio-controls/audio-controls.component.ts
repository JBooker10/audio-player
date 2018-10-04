import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from './../../services/data.service';
import { TrackControllerComponent } from './../track-controller/track-controller.component';
import { Observable, from } from 'rxjs';
import { map, tap, share,  } from 'rxjs/operators';


@Component({
  selector: 'app-audio-controls',
  templateUrl: './audio-controls.component.html',
  styleUrls: ['./audio-controls.component.css'],
  providers: [DataService]
})
export class AudioControlsComponent implements OnInit {
  loaded: boolean = false;
  playing: boolean = false;
  duration: number;
  audio: any;
  

  @ViewChild(TrackControllerComponent) trackController;

  constructor(private data: DataService) { 
    
   // this.audioData.getAudio('5b8cbe02bfe0293e70ef6913');
  }

  
  ngOnInit() {
    this.data.getAudio('5b8cbe02bfe0293e70ef6913').subscribe(
      data => data,
      err => console.log(err),
      () => { this.loaded = true; }
    );
  
  }

  
  

  

 
  

  // pauseAudio() {
  //   if (this.source) {
  //     this.source.stop(0);
  //     this.source = null;
  //     this.position = this.data.ctx.currentTime - this.startTime;
  //     this.playing = false;
  //   }
  // }

  // getCurrentPosition(): number {
  //   this.position = this.playing ?
  //   this.data.ctx.currentTime - this.startTime : this.position;
  //   if ( this.position >= this.buffer.duration ) {
  //     this.position = this.buffer.duration;
  //     this.pauseAudio();
  //   }
  //   return this.position;
  // }

  // getAudioDuration = (start, stop) => {
  //   const streamTime = this.data.ctx.currentTime - this.startTime;
  //   const minutes = Math.floor(this.buffer.duration / 60);
  //   const seconds = Math.floor(this.buffer.duration - minutes * 60);
  //   const currentMin = Math.floor(streamTime / 60);
  //   const currentSec = Math.floor(streamTime - currentMin * 60);
  //   if (this.playing) {
  //   currentSec < 10 ? start.nativeElement.innerHTML = 
  //   currentMin + ':' + '0' + currentSec :
  //   start.nativeElement.innerHTML = currentMin + ':' + currentSec; 
  //   stop.nativeElement.innerHTML = minutes + ':' + seconds;
  //   }
  // }

  // replay() {
  //   this.pauseAudio();
  //   this.position = 0;
  //   this.playAudio();
  // }
}




