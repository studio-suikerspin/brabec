import type { SocialLinksDocument } from '~~/prismicio-types';

export const useSocials = () => {
  return useState<SocialLinksDocument | null>('socials');
};
