export const useGsap = () => {
  const { $gsap, $ScrollTrigger, $SplitText, $InertiaPlugin } = useNuxtApp()

  return {
    gsap: $gsap,
    ScrollTrigger: $ScrollTrigger,
    SplitText: $SplitText,
    InertiaPlugin: $InertiaPlugin
  };
}