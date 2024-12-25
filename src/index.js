import "./styles.css";
import storageAvailable from "./local-storage.js";
import ClassTemplate from "./class-template.js";
import * as p5 from "../node_modules/p5/lib/p5.min.js";

console.log("Hello World!)");
console.log(`Storage available: ${storageAvailable("localStorage")}`);

const x = new ClassTemplate({ exposedVariable1: "mishmash" });
x.exposedVariable2 = 7;
console.log(x.exposedVariable2, x.exposedVariable1);



var inc = 0.005;
var time = 0;
var time2 = 100;
var mouseXold = 0;
var mouseYold = 0;
var timeDirection = 1;
var gridSizeX;
var gridSizeY;
var subtractionStrength = 1;

//a P5 moire pattern.
let s = (sk) => {
    let layers = [];

    // sk.translate(window.innerWidth/2,window.innerHeight/2);
    sk.setup = () =>{
/*         let gfx = sk.createGraphics(window.innerWidth,window.innerHeight);
        let gfx2;

        sk.createCanvas(window.innerWidth,window.innerHeight);
        sk.angleMode(sk.DEGREES);
        sk.imageMode(sk.CENTER);
        sk.translate(window.innerWidth/2,window.innerHeight/2);
        sk.background(40);
        gfx.stroke(200);
        gfx.strokeWeight(3);
        gfx.line(0,0,window.innerWidth,0);
        for(let i=0;i<1000;i++){
            gfx.point(Math.random()*window.innerWidth, Math.random()*window.innerHeight);
        }

        gfx2 = {...gfx};
        sk.image(gfx,0,0);
        sk.rotate(1);
        sk.image(gfx2,0,0);
        sk.rotate(2);
        sk.image(gfx2,0,0);
        sk.rotate(3);
        sk.image(gfx2,0,0);
        sk.rotate(4);
        sk.image(gfx2,0,0); */


        var cnv = sk.createCanvas(720,720);
        //resizeCanvas(windowWidth, windowHeight);
        var x1 = (sk.windowWidth - sk.width) / 2;
        var y1 = (sk.windowHeight - sk.height) / 2;
        cnv.position(x1, y1);
        sk.background(255, 0, 200);
        //canvas.center([horizontal])
        //noiseSeed(1);
        sk.noiseDetail(1,1);
        gridSizeX = sk.width/20;
        gridSizeY = sk.height/20;
    }

    sk.draw = () =>{
        var yoff = 0;
        sk.scale(4);
        sk.loadPixels();
        for (var y = 0; y < sk.height; y++) {
          var xoff = 0;
          for (var x = 0; x < sk.width; x++) {
            
            var gridFactor=144;
            gridSizeX = sk.width/gridFactor;
            gridSizeY = sk.height/gridFactor;
      
            var index = (x + y * sk.width) * 4;
            var mouseDistance = 12000/(sk.sqrt((sk.mouseX-x)**2+(sk.mouseY-y)**2)+1)
            var sinfX = Math.sin(gridSizeX * sk.PI * x / sk.width);
            var sinfY = Math.sin(gridSizeY * sk.PI * y / sk.height)
            var r = sk.noise(xoff, yoff, time) * 255 * (((sinfX * sinfY) /2) +2) 
            *Math.sin( sk.PI * x / (sk.width)) * Math.sin( sk.PI * y / (sk.height))
            - ((sk.noise(xoff, yoff , time2) * 255 * (((sinfX * sinfY) / 2) +0.5))) * subtractionStrength
            -mouseDistance
            
            var RGain = 2;
            var GGain = 6;
            var BGain = 2;
            var RExp = 100;
            var GExp = 4;
            var BExp = 1;
            var R = (r^RExp);
            var G = (r^GExp);
            var B = (r^BExp);
      
      
            sk.pixels[index + 0] = R*RGain;
            sk.pixels[index + 1] = G*GGain;
            sk.pixels[index + 2] = B*BGain;
            if (R+G+B < 1) {
              sk.pixels[index + 3] = 0;
            } else {
                sk.pixels[index + 3] = 255;
            }
      
            xoff += inc;
          }
          yoff += inc;
        }
        time = time + timeDirection * (sk.abs(sk.mouseX - mouseXold) + sk.abs(sk.mouseY - mouseYold)) / 1000
        time2 += 0.03
        mouseXold = sk.mouseX
        mouseYold = sk.mouseY
        sk.scale(4);
        sk.updatePixels();
    }

}
const P5 = new p5(s);