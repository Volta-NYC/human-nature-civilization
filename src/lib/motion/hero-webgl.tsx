"use client";

import { useEffect, useRef } from "react";

const vertex = `attribute vec2 position; void main(){gl_Position=vec4(position,0.,1.);}`;
const fragment = `
precision highp float;
uniform vec2 resolution, pointer;
uniform float time;
float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
float noise(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(hash(i),hash(i+vec2(1,0)),f.x),mix(hash(i+vec2(0,1)),hash(i+vec2(1)),f.x),f.y);}
float fbm(vec2 p){float v=0.,a=.5;for(int i=0;i<5;i++){v+=a*noise(p);p=mat2(1.6,1.2,-1.2,1.6)*p;a*=.5;}return v;}
void main(){
 vec2 uv=(gl_FragCoord.xy*2.-resolution)/min(resolution.x,resolution.y);
 vec2 m=(pointer*2.-1.)*vec2(resolution.x/resolution.y,1.);float t=time*.12;
 vec2 p=uv*1.15;float f=fbm(p+vec2(t,-t*.7)+fbm(p*1.7-t));float w=fbm(p*1.9+f*1.8+vec2(-t,t));
 f+=exp(-2.8*length(uv-m*.3))*.18;
 vec3 paper=vec3(.965,.945,.885),blue=vec3(.10,.29,.78),coral=vec3(.94,.30,.18),mint=vec3(.16,.62,.50);
 vec3 c=mix(paper,blue,smoothstep(.42,.78,f)*.82);c=mix(c,coral,smoothstep(.55,.88,w)*.70);c=mix(c,mint,smoothstep(.65,.93,f+w*.18)*.42);
 c+=smoothstep(1.05,.18,length(uv*vec2(.82,1.)))*.16+(hash(gl_FragCoord.xy+time)-.5)*.025;gl_FragColor=vec4(c,1.);
}`;

export default function HeroWebGL() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas=canvasRef.current;if(!canvas)return;const gl=canvas.getContext("webgl",{alpha:false,antialias:false});if(!gl)return;
    const compile=(type:number,source:string)=>{const s=gl.createShader(type)!;gl.shaderSource(s,source);gl.compileShader(s);return s;};
    const program=gl.createProgram()!;gl.attachShader(program,compile(gl.VERTEX_SHADER,vertex));gl.attachShader(program,compile(gl.FRAGMENT_SHADER,fragment));gl.linkProgram(program);gl.useProgram(program);
    const buffer=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,buffer);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,3,-1,-1,3]),gl.STATIC_DRAW);
    const pos=gl.getAttribLocation(program,"position");gl.enableVertexAttribArray(pos);gl.vertexAttribPointer(pos,2,gl.FLOAT,false,0,0);
    const res=gl.getUniformLocation(program,"resolution"),mouse=gl.getUniformLocation(program,"pointer"),clock=gl.getUniformLocation(program,"time");
    const pointer={x:.72,y:.52},target={...pointer};const reduced=matchMedia("(prefers-reduced-motion: reduce)").matches;let frame=0;const start=performance.now();
    const resize=()=>{const d=Math.min(devicePixelRatio||1,1.75),w=Math.round(canvas.clientWidth*d),h=Math.round(canvas.clientHeight*d);if(canvas.width!==w||canvas.height!==h){canvas.width=w;canvas.height=h;gl.viewport(0,0,w,h);}};
    const move=(e:PointerEvent)=>{const r=canvas.getBoundingClientRect();target.x=(e.clientX-r.left)/r.width;target.y=1-(e.clientY-r.top)/r.height;};
    const draw=(now:number)=>{resize();pointer.x+=(target.x-pointer.x)*.035;pointer.y+=(target.y-pointer.y)*.035;gl.uniform2f(res,canvas.width,canvas.height);gl.uniform2f(mouse,pointer.x,pointer.y);gl.uniform1f(clock,reduced?9:(now-start)/1000);gl.drawArrays(gl.TRIANGLES,0,3);if(!reduced)frame=requestAnimationFrame(draw);};
    addEventListener("resize",resize);addEventListener("pointermove",move,{passive:true});draw(start);
    return()=>{cancelAnimationFrame(frame);removeEventListener("resize",resize);removeEventListener("pointermove",move);};
  },[]);
  return <canvas ref={canvasRef} className="hero-webgl" aria-hidden="true"/>;
}
