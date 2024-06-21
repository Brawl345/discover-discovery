export interface Data {
  blocks: Block[];
}

export interface Block {
  uid: string;
  type: string;
  title: string;
  category: string;
  anchorName: boolean;
  contentTitle: string;
  rendering: string;
  itemsType: string;
  items: Item[];
}

export interface Item {
  uid: string;
  title: string;
  dateCreated: string;
  dateLastModified: string;
  datePublished: string;
  type: string;
  slug: string;
  subtitle: null;
  description: null;
  metaTitle: string;
  metaDescription: string;
  attributes: ItemAttributes;
  articleContent: string;
  parentPage: ParentPage;
  metaMedia: MetaMedia[];
  taxonomies: Taxonomy[];
  order: number;
  firstLetter: string;
}

export interface ItemAttributes {
  showId: string;
  tuneinInfo: string;
  sonicVideosOrdering: string;
  ottPlatformUrl: string;
  ottPlatformName: string;
  channelPage: null;
}

export interface ParentPage {
  uid: string;
  title: string;
  dateCreated: string;
  dateLastModified: string;
  datePublished: string;
  type: string;
  slug: string;
  subtitle: null;
  description: null;
  metaTitle: string;
  metaDescription: string;
  attributes: Record<string, never>;
}

export interface MetaMedia {
  media: Media;
  role: string;
}

export interface Media {
  title: string;
  type: string;
  url: string;
  imageServiceKey: string;
}

export interface Taxonomy {
  id: string;
  title: string;
  slug: string;
  category: string;
}

export enum Realm {
  DMAX = 'dmax',
  TLC = 'tlc',
  HGTV = 'hgtv',
}

export function getRealmName(realm: Realm): string {
  switch (realm) {
    case Realm.DMAX:
      return 'DMAX';
    case Realm.TLC:
      return 'TLC';
    case Realm.HGTV:
      return 'HGTV';
  }
}

export const allRealms = [Realm.DMAX, Realm.TLC, Realm.HGTV];
