
function Circle (canvas,x,y,radius,density,color){
  this.canvas  = canvas;
  this.ctx     = this.canvas.getContext('2d');
  this.x       = x;
  this.y       = y;
  this.angle   = 0;
  this.radius  = radius;
  this.density = density;
  this.vx      = Math.sin(this.angle) * 2;
  this.vy      = Math.cos(this.angle+this.density) + 1 + this.radius/2;
  this.color   = color;
  
  this.draw = ()=>{
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);  
    this.ctx.fillStyle = this.color;
    this.ctx.fill();  
  }
  this.update = ()=>{
    this.x  += this.vx;
    this.y  += this.vy;

    if(this.x > this.canvas.width + 5 || this.x < -5 || this.y > this.canvas.height - 50){		
		this.x = Math.random()* this.canvas.width;
        this.y = -10;
	}

    
    this.draw();
  }
  return {
    draw : this.draw,
    update : this.update
  }
}


function Snow(canvas){
    this.canvas     = canvas;
    this.ctx        = this.canvas.getContext('2d');
    this.mp         = 30;
    this.w          = window.innerWidth;
    this.h          = window.innerHeight;
    this.particles  = [];

    this.setDimention = ()=>{
        this.canvas.width  = this.w;
        this.canvas.height = this.h;
    }

    this.setParticles = ()=>{
        for (var i=0; i<this.mp; i++){
            let x       = Math.random()* this.w; //x-coordinate
            let y       = Math.random()* this.h; //y-coordinate
            let radius  = Math.random()*4 + 1; //radius
            let density = Math.random()* this.mp; //density
            let color   = 'white'; 
            this.particles.push(new Circle(this.canvas,x,y,radius,density,color))
        }
    }

    this.animate = ()=>{
        requestAnimationFrame(this.animate)
        this.ctx.clearRect(0,0,this.w,this.h);
        this.particles.forEach(p => {
            p.update();
        });
    }

    return {
        setDimention : this.setDimention,
        setParticles : this.setParticles,
        animate      : this.animate,
        particles    : this.particles
    }

}

module.exports = { Snow };



