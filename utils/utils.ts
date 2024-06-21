import { Item } from '@/utils/types';

export const getImageUrl = (item: Item) => {
  let media = item.metaMedia.find((media) => media.role === 'preview');

  if (!media) {
    media = item.metaMedia.at(0);
  }

  return media?.media.url;
};
