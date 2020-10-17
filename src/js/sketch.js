import Sketch from "./app.js";
import fragment from "./shaders/fragment.glsl";
import vertex from "./shaders/vertex.glsl";
import Splitting from "splitting";
import "splitting/dist/splitting.css";
import "splitting/dist/splitting-cells.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const sketch = new Sketch({
  dom: document.getElementById("container"),
  fragment: fragment,
  vertex: vertex,
});

const titles = [...document.querySelectorAll("h2")];
// const results = Splitting({ target: titles, by: 'words' });
// console.log(results);

titles.forEach((title) => {
  let results = Splitting({ target: title, by: "chars" });
  let mr = Math.ceil( Math.random() * 90 );
  mr *= -1;

  // console.log(mr);
  // console.log(results[0].chars[0]);
  // console.log(results[0].chars);

  gsap.from(results[0].chars, {
    scrollTrigger: {
      trigger: title,
      scrub: 1,
      toggleAction: 'restart pause reverse pause',
    },
    duration: 0.6,
    stagger: 0.07,
    scale: 3,
    autoAlpha: 0,
    rotation: mr
  });
});


let o = { a: 0 };
let tl = gsap.timeline();

gsap.to(o, {
  a: 1,
  scrollTrigger: {
    trigger: '.wrap',
    // markers: true,
    scrub: 1,
    start: 'top top',
    end: 'bottom bottom',
    snap: 1/(titles.length - 1),
    onUpdate: (self) => {
      // console.log(sketch.scene);
      // console.log(sketch.model, self.progress);
      // sketch.model.rotation.y = 2. * 3.14 * self.progress;
      sketch.scene.rotation.y = 2. * 3.14 * self.progress;
      sketch.scene.position.z = -0.5 * Math.sin(3.14 * self.progress);
    }
  },
});
