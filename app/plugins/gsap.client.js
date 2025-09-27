import { gsap } from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import InertiaPlugin from 'gsap/InertiaPlugin';
import SplitText from 'gsap/SplitText';

export default defineNuxtPlugin(() => {
  if (import.meta.client) {
    gsap.registerPlugin(ScrollTrigger, SplitText, InertiaPlugin);
  }

  return {
    provide: {
      gsap,
      ScrollTrigger,
      SplitText,
      InertiaPlugin
    }
  }
})