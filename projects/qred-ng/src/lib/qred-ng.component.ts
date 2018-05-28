import { Component, OnInit,AfterViewInit ,OnChanges} from '@angular/core';
import { ElementRef } from '@angular/core';
import { ViewChild } from '@angular/core';
import { Input } from '@angular/core';

@Component({
  selector: 'qred-ng',
  templateUrl: './qred-ng.component.html',
  styles: ['qred-ng.component.css']
})
export class QredNg implements OnInit,AfterViewInit,OnChanges {

  cssClass:String = ""
  baseComponentStyle:String = "width:200px;height:200px; border:3px solid red;text-align:inherit;position: inherit;"
  @ViewChild('videoPlayer', {read: ElementRef})
  videoplayerElementRef: ElementRef;
  videoplayer: HTMLVideoElement;

  @Input()
  width:String

  @Input()
  height:String

 constructor() { this.width = '\''+this.width+'\'';}

  ngOnInit() {
    console.log("init")

    //this.width += '%';
  }
  ngOnChanges(){
      console.log("changes")


  }
  ngAfterViewInit() {
    console.log('vinit')
    if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
            this.videoplayer = this.videoplayerElementRef.nativeElement;

            if ('srcObject' in this.videoplayer) {
                this.videoplayer.defaultMuted=true;
                this.videoplayer.msHorizontalMirror=false;
                this.videoplayer.srcObject = stream;
                this.videoplayer.src = (window.URL || (window as any ).webkitURL).createObjectURL(stream);
            }
            else if((navigator as any ).mozGetUserMedia){
                (this.videoplayer as any ).mozSrcObject = stream;
              }
            this.videoplayer.play();
        });

    }
  }
}
