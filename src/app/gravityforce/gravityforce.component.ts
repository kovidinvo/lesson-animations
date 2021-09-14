import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TimeoutError } from 'rxjs';

@Component({
  selector: 'app-gravityforce',
  templateUrl: './gravityforce.component.html',
  styleUrls: ['./gravityforce.component.scss']
})
export class GravityforceComponent implements OnInit {
  @ViewChild("canvas",{static:true})
  canvas! : ElementRef<HTMLCanvasElement>;
  ctx! : CanvasRenderingContext2D;
  speed = 50;
  handleTimeout=0;

  constructor() { }

  ngOnInit(): void {
    this.ctx = this.canvas.nativeElement.getContext('2d')!;
  }

  drawCanvas() {

  }

  animate() {
    this.drawCanvas()
    this.handleTimeout=window.setTimeout(this.animate,this.speed)
  }

  stopAnimation() {
    window.clearTimeout(this.handleTimeout);
  }

  reset() {
    
  }
}
