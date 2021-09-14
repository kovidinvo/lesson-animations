import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Painter } from '../painter';

@Component({
  selector: 'app-gravityforce',
  templateUrl: './gravityforce.component.html',
  styleUrls: ['./gravityforce.component.scss']
})
export class GravityforceComponent implements OnInit {
  @ViewChild("canvas",{static:true})
  canvas! : ElementRef<HTMLCanvasElement>;
  ctx! : CanvasRenderingContext2D;
  speed = 100;
  timestep=10;
  time=0
  angle=45;
  force = 100;
  handleTimeout=0;
  drawVectors=false
  width=600
  height=600
  gravity=9.81
  cx = 20
  cy = this.height-20

  private painter! : Painter

  constructor() { }

  ngOnInit(): void {
    this.ctx = this.canvas.nativeElement.getContext('2d')!;
    this.painter = new Painter(this.ctx)
    this.drawCanvas();
  }

  drawCanvas() : boolean {
    const radA=this.angle/180*Math.PI
    const vx = this.force*Math.cos(radA)
    const v0y = this.force*Math.sin(radA)
    const vy = v0y - this.gravity*this.time;
    const x = this.cx+vx*this.time;
    const y = this.cy - v0y*this.time + this.gravity*this.time*this.time/2
    const xf = x+vx
    const yf = y-vy
    
    this.ctx.save()
    this.ctx.beginPath()
    this.ctx.arc(x,y,10,0,Math.PI*2)
    this.ctx.stroke()

    this.ctx.restore()
    return y<this.cy
  }

  animate() {
    const result = this.drawCanvas()
    this.time+=this.timestep
    if(result) this.handleTimeout=window.setTimeout(this.animate,this.speed)
  }

  stopAnimation() {
    window.clearTimeout(this.handleTimeout);
  }

  reset() {
    
  }
}
