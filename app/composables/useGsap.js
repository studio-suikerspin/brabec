export const useGsap = () => {
  const { $gsap, $ScrollTrigger, $SplitText, $InertiaPlugin, $Draggable } =
    useNuxtApp();

  return {
    gsap: $gsap,
    ScrollTrigger: $ScrollTrigger,
    SplitText: $SplitText,
    InertiaPlugin: $InertiaPlugin,
    Draggable: $Draggable,
  };
};
