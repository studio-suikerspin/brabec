import { gsap } from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import InertiaPlugin from 'gsap/InertiaPlugin';
import SplitText from 'gsap/SplitText';
import Draggable from 'gsap/Draggable';

export default defineNuxtPlugin(() => {
  if (import.meta.client) {
    gsap.registerPlugin(ScrollTrigger, SplitText, InertiaPlugin, Draggable);
  }

  return {
    provide: {
      gsap,
      ScrollTrigger,
      SplitText,
      InertiaPlugin,
      Draggable,
    },
  };
});
