import{S as H,P as V,W as I,a as j,O as K,T as U,A as X,D as Y,b as J,G as Q,M as Z,c as _,V as S,d as $,e as F,f as ee,g as k,h as A,B as L,i as te,j as ne,k as B,l as oe,R as ae,m as ie,n as se,C as re}from"./vendor.f838601b.js";const de=function(){const c=document.createElement("link").relList;if(c&&c.supports&&c.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))P(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const d of t.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&P(d)}).observe(document,{childList:!0,subtree:!0});function g(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?t.credentials="include":e.crossorigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function P(e){if(e.ep)return;e.ep=!0;const t=g(e);fetch(e.href,t)}};de();let n,a,i,G,s,w,y,p,b,v,x,D,C,h,u,m,E,z,N,O,W,R,f,r,l,M=[],q=[];function le(){ce(),we()}function ce(){a=new H,i=new V(75,window.innerWidth/window.innerHeight,.1,1e3),i.position.y=1,i.position.z=5,n=new I({antialias:!0}),n.shadowMap.enabled=!0,n.shadowMap.type=j,n.setPixelRatio(window.devicePixelRatio),n.setSize(window.innerWidth,window.innerHeight),document.body.appendChild(n.domElement),f=new K(i,n.domElement),r=new U(i,n.domElement),a.add(r),r.addEventListener("mouseDown",function(){f.enabled=!1}),r.addEventListener("mouseUp",function(){f.enabled=!0}),window.addEventListener("keydown",function(e){switch(e.key){case"q":r.setMode("translate");break;case"w":r.setMode("rotate");break;case"e":r.setMode("scale");break}}),G=new X(4210752),a.add(G),s=new Y(16777215,2),s.position.set(0,50,0),s.castShadow=!0,s.intensity=.1,a.add(s),w=new J(16777215),w.position.set(-.5,1,6),w.castShadow=!0,w.intensity=.5,a.add(w);const o=1024,c=.5,g=500;s.shadow.mapSize.width=o,s.shadow.mapSize.height=o,s.shadow.camera.near=c,s.shadow.camera.far=g,new Q().setPath("./assets/").load("Logo3D.glb",e=>{l=e.scene,l.scale.set(.5,.5,.5),l.position.y=-.3;const t=new Z({color:16753920});l.traverse(d=>{d.type==="Mesh"&&(d.material=t)}),r.attach(l),a.add(l)}),h=new _({gravity:new S(0,-9.81,0)}),x=new $(10,10),D=new F({color:16777215,side:ee}),m=new k(x,D),m.receiveShadow=!0,a.add(m),E=new A,u=new L({type:L.STATIC,shape:new te(new S(5,5,.001)),material:E}),u.quaternion.setFromEuler(-Math.PI/2,0,0),h.addBody(u),y=new ne,p=new B,b=new B,v=new oe,C=new ae,window.addEventListener("mousemove",function(e){y.x=e.clientX/window.innerWidth*2-1,y.y=-(e.clientY/window.innerHeight)*2+1,b.copy(i.position).normalize(),v.setFromNormalAndCoplanarPoint(b,a.position),C.setFromCamera(y,i),C.ray.intersectPlane(v,p)}),window.addEventListener("click",function(){N=new ie(.125,30,30),O=new F({color:Math.random()*16777215,metalness:0,roughness:0});const e=new k(N,O);e.castShadow=!0,a.add(e),W=new A,z=new L({mass:.3,shape:new se(.125),position:new S(p.x,p.y,p.z),material:W}),h.addBody(z),R=new re(E,W,{friction:.1,restitution:1}),h.addContactMaterial(R),M.push(e),q.push(z)}),T()}function we(){window.addEventListener("resize",pe,!1)}function pe(){i.aspect=window.innerWidth/window.innerHeight,i.updateProjectionMatrix(),n.setSize(window.innerWidth,window.innerHeight)}const he=1/60;function T(){requestAnimationFrame(()=>{T()}),f&&f.update(),h.step(he),m.position.copy(u.position),m.quaternion.copy(u.quaternion);for(let o=0;o<M.length;o++)M[o].position.copy(q[o].position),M[o].quaternion.copy(q[o].quaternion);n.setClearColor(0,1),n.render(a,i)}le();