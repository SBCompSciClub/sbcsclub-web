import React, { Component } from 'react'

import "./HomeContent.css"
import useMediaQuery from '@material-ui/core/useMediaQuery';

import Workshop from "./Workshop.js"


import Cookies from "universal-cookie";
const cookies = new Cookies();

function HomeContentHook(Component){
    const isMobile = useMediaQuery({ query: '(max-width: 1000px)' });
    return <Component mobile={isMobile}/>;
}



const workshops = ["PC Building", "Artificial Intelligence", "Cybersecurity", "Game Development", "C", "Web Development", "Python Beginner"]

const leads = [
  ["Hitesh Ale", "Rishi Paladugu"],
  ["Satvik Vejendla", "Aditi Ajoykumar"],
  ["Satvik Vejendla", "Aditi Ajoykumar"],
  ["Yash Nishikant", "Burhan Naveed"],
  ["Pooja Raghuram", "Sridula Kunamneni", "Tejas Raghuram"],
  ["Aashika Parekh", "Mahit Mehta"],
  ["Sharvani Vadlamani", "Shreya Venkateswaran"]];

const descriptions = [
  "Build your own PCs using hardware parts",
  "Create AI Models for chatbots and health predictors",
  "Learn how to identify and exploit web vulnerabilities",
  "Create your own games using JPanel and Pygame",
  "Learn C from scratch",
  "Create your own websites using HTML and CSS",
  "Learn Python from scratch and make your own projects"
]


const difficulties = [
  2,
  3,
  3,
  3,
  2,
  1,
  1
]

export default class HomeContent extends Component {
    constructor(props) {
      super(props)
      this.state = { scroll: 0};

      cookies.set("mobile", !window.matchMedia("(min-width: 600px)").matches )
    }

    watchResize = () => {
        cookies.set("mobile", !window.matchMedia("(min-width: 600px)").matches );
    }

    watchAnimation = () => {
      document.getElementById("home-title").classList.add("transition")
    }

    transitionEnd = (elem) => {
      console.log(elem.target)

      /*
      document.getElementById("home-title").classList.remove("transition")
      document.getElementById("home-title").classList.add("after")*/
      elem.target.classList.remove("transition")
      elem.target.classList.add("after")
    }

    watchScroll = () => {
      this.setState({scroll: window.scrollY});
    }
    
    componentDidMount() {
      window.addEventListener("resize", this.watchResize)
      window.addEventListener("finishedAnimation", this.watchAnimation);
      document.getElementById("home-title").addEventListener('transitionend', this.transitionEnd);
      document.getElementById("home-title").addEventListener('webkitAnimationEnd', this.transitionEnd);
      document.getElementById("description").addEventListener('transitionend', this.transitionEnd);
      document.getElementById("description").addEventListener('webkitAnimationEnd', this.transitionEnd);
      window.addEventListener("scroll", this.watchScroll)
    }
    render() {
      let opacity;
      if(this.state.scroll > 0){
        opacity = 1 - (this.state.scroll) / 60;

        if(opacity < 0){
          opacity = 0;
        }

        document.getElementById("home-title").style.opacity = opacity;

      }
      console.log(this.state.scroll)

      if(document.getElementById("description")){

        document.getElementById("description").style.opacity = 1 - (500-this.state.scroll) * (200 - this.state.scroll) / 30000;
      }

      if(this.state.scroll > 190 && !document.getElementById("description").classList.contains("after")){
        document.getElementById("description").classList.add("transition")
      }

      return (
        <div class="center">
          <div id="home-title">
            SBHS Computer Science Club
          </div>
          <div id="description">
            Join the Computer Science Club and learn anything you want!
            Explore your creative nature by designing and programming
            interactive websites from the ground up, and learn the beauty of
            the open-source community. Expand your programming skills and
            learn the basics of application development applicable to any
            other computer science-related course or project. All while
            gaining career and college readiness!
          </div>

          <div id="workshops-description" class="center">
            <div id="workshops-title">
              <u>Workshops</u>
            </div>

            <div id="workshops-list" class="grid">
              {workshops.map( (val, i) => {
                return <Workshop name={val} leads={leads[i]} description={descriptions[i]} difficulty={difficulties[i]}/>
              })}
            </div>

          </div>
        </div>
      );
    }
}
