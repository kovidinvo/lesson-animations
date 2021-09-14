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
  timestep=0.5;
  time=0
  angle=45;
  force = 85;
  handleTimeout=0;
  drawVectors=false
  width=800
  height=600
  gravity=9.81
  cx = 20
  cy = this.height-100

  private painter! : Painter

  constructor() { }

  ngOnInit(): void {
    this.ctx = this.canvas.nativeElement.getContext('2d')!;
    this.painter = new Painter(this.ctx)
    this.drawCanvas()
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
    const radA1 = Math.atan(vy/vx)
    
    const p =this.painter
    p.drawVectors=true
    this.ctx.save()
    this.ctx.clearRect(0,0,this.width,this.height)
    this.ctx.fillStyle="rgb(100,100,100)"
    this.ctx.fillRect(0,this.cy,this.width,1)
    this.ctx.beginPath()
    this.ctx.arc(x,y,5,0,Math.PI*2)
    this.ctx.fill()

    p.drawLine(x,y,xf,yf,`rgb(0,0,0)`,Math.PI/2-radA1)
    p.drawLine(x,y,xf,y,`rgb(255,0,0)`,Math.cos(radA1)>0 ? Math.PI/2 : 3*Math.PI/2)
    p.drawLine(x,y,x,yf,`rgb(0,0,255)`,Math.sin(radA1)>0 ? 0 : Math.PI)

    this.ctx.restore()
    return y<=this.cy
  }

  animate() {
    const result = this.drawCanvas()
    this.time+=this.timestep
    if(result) this.handleTimeout=window.setTimeout(()=>this.animate(),this.speed)
  }

  stopAnimation() {
    window.clearTimeout(this.handleTimeout);
  }

  startAnimation() {
    this.time=0
    this.animate()
  }

  reset() {
    
  }
}
