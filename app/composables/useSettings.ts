import type { SettingsDocument } from '~~/prismicio-types';

export const useSettings = () => {
  return useState<SettingsDocument | null>('settings');
};
