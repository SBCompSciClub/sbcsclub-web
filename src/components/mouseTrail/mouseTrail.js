import React, { Component } from 'react'

import "./mouseTrail.css"
import Dot from "./Dot.js"
import { timeline } from 'animejs';

/*
var cursor = function() {
  this.x = 0;
  this.y = 0;
  this.node = (function(){
    var n = document.createElement("div");
    n.className = "cursor";
    document.body.appendChild(n);
    n.style.position = "fixed"
    return n;
  }());
};
// The cursor.prototype.draw() method sets the position of 
  // the object's <div> node
cursor.prototype.draw = function() {
  this.node.style.left = this.x + "px";
  this.node.style.top = this.y + "px";
};
*/

let cursor = new Dot("cursor", 10);
let trail = new Dot("trail", 15);


let dots = {
  cursor: cursor,
  trail: trail
}
let mouse = {
  cursor: {
    x: 0,
    y: 0,
  },
  trail: {
    x: 0,
    y: 0
  }
};

function draw(dotName) {
  // Make sure the mouse position is set everytime
    // draw() is called.
  var x = mouse[dotName].x,
      y = mouse[dotName].y;
 
  let dot = dots[dotName]

  dot.x = x - dot.offset;
  dot.y = y - dot.offset;
  dot.draw()
 }
 
 function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
 }

 function updatePos(e, dotName) {
  var relPos = {
    x: e.pageX,
    y : e.pageY - window.scrollY
  };
  mouse[dotName].x = relPos.x;
  mouse[dotName].y = relPos.y;
 }


 window.addEventListener("mousemove", async function(e) {

  updatePos(e, "cursor")
 
  draw("cursor")

 });

 window.addEventListener("mousemove", async function(e) {
  await sleep(100)

  updatePos(e, "trail")

  draw("trail")
  
 })


export default class mouseTrail extends Component {
    render() {
        return (
            <div>
                
            </div>
        )
    }
}
