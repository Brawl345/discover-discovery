import { Item } from '@/utils/types';

export const getImageUrl = (item: Item) => {
  let media = item.metaMedia.find((media) => media.role === 'preview');

  if (!media) {
    media = item.metaMedia.at(0);
  }

  return media?.media.url;
};

export const isBlank = (str: string | null | undefined) => {
  if (str === null || str === undefined) {
    return true;
  }
  return str.trim().length === 0;
};

export const strOr = (str: string | null | undefined, fallback: string) => {
  if (isBlank(str)) {
    return fallback;
  }
  return str;
};
