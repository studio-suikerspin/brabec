import { gsap } from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import InertiaPlugin from 'gsap/InertiaPlugin';
import SplitText from 'gsap/SplitText';
import Draggable from 'gsap/Draggable';
import CustomEase from 'gsap/CustomEase';

export default defineNuxtPlugin(() => {
  if (import.meta.client) {
    gsap.registerPlugin(
      ScrollTrigger,
      SplitText,
      InertiaPlugin,
      Draggable,
      CustomEase,
    );
  }

  return {
    provide: {
      gsap,
      ScrollTrigger,
      SplitText,
      InertiaPlugin,
      Draggable,
      CustomEase,
    },
  };
});
