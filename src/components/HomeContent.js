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

const workshops = [
  {
    name: "Web Scraping",
    leads: [ "Mohammad", "Satvik"],
    difficultyLevel: 0,
    description: "Web scraping is the act of searching for data on websites. The web scraping workshop will cover the BeautifulSoup library in Python and students will learn how to harvest information from the internet."
  },
  {
    name: "SQL",
    leads: [ "Swathi", "Aditi" ],
    difficultyLevel: 0,
    description: "For the SQL workshop, we will introduce relational databases. SQL commands will be taught and the students in our workshops will download open source databases and practice SQL with the databases. Students will learn how to create database tables, as well as insert, withdraw, add, and delete data."
  },
  {
    name: "Data Structures and Algorithms",
    leads: [ "Vivaan", "Burhan" ],
    difficultyLevel: 0,
    description: "We are running an introductory course on data structures and algorithms where we go over what algorithms, data structures, and time complexity are, and how all of these are important for their practical uses. We will also be going over a few basic sorting and searching algorithms and basic data structures. If we get extra time, we will also be going over some more advanced data structures and algorithms. The course will be taught in Java to save time as everyone who takes it will know how to code in Java."
  },
  {
    name: "Intro to Python",
    leads: [ "Diya", "Esha" ],
    difficultyLevel: 0,
    description: "Introduction to Python will introduce students to the basics of Python through mini projects. Some topics covered will include data types, conditionals, loops, and functions. These principles will then be applied to create a large project by the end of the workshop."
  },
  {
    name: "Cross-Platform Database App",
    leads: [ "Tejas", "Ali"],
    difficultyLevel: 0,
    description: "Within this workshop, students will learn how to make a cross-platform database app. The goal of this database program is to store user information, like names, ages, emails, and phone numbers. In order to make this app, our workshop will use React Native, Java, Node.JS, and, MariaDB. All languages will be taught to the extent possible to make the app, but after teaching what is needed, students can do further if they want to further research the language they coded in."
  },
  {
    name: "MatPlotLib",
    leads: [ "Abhik", "Yash" ],
    difficultyLevel: 0,
    description: "With the Python data visualization workshop, we will be working to work with the MatPlotLib library in Python to use graphics to visualize data on your screen. This workshop is best for students with a more advanced python skill level."
  },
  {
    name: "Flutter App Dev",
    leads: [ "Shreya", "Sharvani" ],
    difficultyLevel: 0,
    description: "The course will focus on mobile app development using Flutter.  Students will learn various technologies, such as the implementation of buttons, text, and different screens. In the end, each student will be able to design their own basic app."
  },
  {
    name: "Web Development",
    leads: [ "Mahit", "Pooja"],
    difficultyLevel:  0,
    description: "In the web development course students will learn how to setup a basic html file with basic elements and learn simple SEO (Search Engine Optimization). Additionally, students will learn how to style the page with css and JavaScript to create simple, effective animations to make their webpage will smooth and snappy. At the end of the class they will be tasked to create a portfolio website with their new skills and assistance from their teachers."
  }
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
              {workshops.map(({ name, leads, description, difficultyLevel }, i) => {
                return (
                  <Workshop 
                    key={i}
                    name={name} 
                    leads={leads} 
                    description={description} 
                    difficulty={difficultyLevel}
                  />
                )
              })}
            </div>

          </div>
        </div>
      );
    }
}
