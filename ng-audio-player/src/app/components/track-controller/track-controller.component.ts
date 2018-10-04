import { Component, OnInit, ViewChild, Renderer2, ElementRef, AfterContentInit, 
Input } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DataService } from './../../services/data.service';


@Component({
  selector: 'app-track-controller',
  templateUrl: './track-controller.component.html',
  styleUrls: ['./track-controller.component.css'],
})

export class TrackControllerComponent implements OnInit {
  
  @Input() loaded: boolean;
  @Input() playing: boolean;
  @Input() getAudioDuration: any;
  @Input() getCurrentPosition: any;
  @Input() buffer: any;


  hasLoaded: boolean = false;
  duration: number;
  load: boolean = false;
  
  @ViewChild('progressBar') progressBar: any;
  @ViewChild('progressing') progressing: any;
  @ViewChild('start') start: ElementRef;
  @ViewChild('stop') stop: ElementRef;

  constructor( private renderer: Renderer2, private data: DataService) {
    
    
   }
   
   ngOnInit() {
      this.getProgress();
   }


   togglePlayer() {
    this.playing = !this.playing;
    this.data.toggle(this.playing);
  }

  getProgress() {
    const check = setInterval(() => {
      this.data.buffer.duration && this.progressing ?  this.animateProgressBar() : 
      console.log(this.load); }, 300);
      if (this.load) {
        clearInterval(check);
      }
      console.log(this.load);
  }
  

  replay() {
    this.data.pauseAudio();
    this.data.position = 0;
    this.data.playAudio();
  }

   animateProgressBar() {
     this.load = true;
    const progression = this.data.getCurrentPosition() / this.data.buffer.duration;
    const width = this.progressBar.nativeElement.offsetWidth;
    const progressWidth = progression * width + 'px';
    this.data.getAudioDuration(this.start, this.stop);
    this.renderer.setStyle(this.progressing.nativeElement, 'width' , progressWidth );
    requestAnimationFrame(this.animateProgressBar.bind(this));
  }
}

