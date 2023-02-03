import _ from 'lodash';

import DappdConfig from '@/root/.dappd.json';

import {AppHeaderPropsT} from '@/components/app/header';
import {PagePropsT} from '@/components/page';
import {PageContentPropsT} from '@/components/page/content';
import {PageSectionPropsT} from '@/components/page/section';

export type DappdThemeT = {
  defaultTextColor: string;
  defaultBackgroundColor: string;
  page: keyof Omit<PagePropsT, 'children'>;
  appHeader: keyof Omit<AppHeaderPropsT, 'children'>;
  content: keyof Omit<PageContentPropsT, 'children'>;
  section: keyof Omit<PageSectionPropsT, 'children'>;
};

export type DappdContractsT = {
  disableEthers: boolean;
  defaultChain: number;
  supportedChains: number[];
};

export type DappdConfigT = {
  general: {
    name: string;
    domain: string;
    companyName: string;
  };
  theme: DappdThemeT;
  contracts: DappdContractsT;
  social: {
    [key: string]: string;
  };
  seo: {
    addSiteName: boolean;
    canonical: string;
    robots: string;
    metadata: {
      title: string | null;
      description: string | null;
      siteName: string;
      ogImage: string | null;
      ogImageHeight: string | null;
      ogImageWidth: string | null;
      ogType: string | null;
      twitterHandle: string | null;
    };
  };
};

export type AcceptedConfigTypesT = boolean | string | number | null | undefined | (string | number | boolean)[];

// Needs full path to work: ex: 'theme.defaultTextColor' || 'theme.appHeader.background' || 'theme.seo.metaData.siteName'
export function getConfigValue(path: string, defaultValue: AcceptedConfigTypesT) {
  return _.get(DappdConfig, path, defaultValue);
}

// Prefixes path with theme
export function getThemeValue(path: string, defaultValue: AcceptedConfigTypesT) {
  return getConfigValue(`theme.${path}`, defaultValue);
}
