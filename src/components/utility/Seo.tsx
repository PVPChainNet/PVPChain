import Head from 'next/head';
import {useRouter} from 'next/router';

import {getConfigValue} from '@/typescript/types/DappdConfigT';

export type SeoPropsT = {
  title?: string;
  description?: string;
  siteName?: string;
  addSiteName?: boolean;
  canonical?: string;
  ogImage?: string;
  ogImageHeight?: string;
  ogImageWidth?: string;
  ogType?: string;
  twitterHandle?: string;
  robots?: string;
};

export default function Seo({
  title = getConfigValue('seo.metadata.title', undefined),
  description = getConfigValue('seo.metadata.description', undefined),
  siteName = getConfigValue('seo.metadata.siteName', undefined),
  addSiteName = Boolean(getConfigValue('seo.addSiteName', true)),
  canonical = getConfigValue('seo.canonical', undefined),
  ogImage = getConfigValue('seo.metadata.ogImage', undefined),
  ogImageHeight = getConfigValue('seo.metadata.ogImageHeight', undefined),
  ogImageWidth = getConfigValue('seo.metadata.ogImageWidth', undefined),
  ogType = getConfigValue('seo.metadata.ogType', undefined),
  twitterHandle = getConfigValue('seo.metadata.twitterHandle', undefined),
  robots = getConfigValue('seo.robots', undefined),
}: SeoPropsT) {
  const router = useRouter();

  const _pathSliceLength = Math.min.apply(Math, [
    router.asPath.indexOf('?') > 0 ? router.asPath.indexOf('?') : router.asPath.length,
    router.asPath.indexOf('#') > 0 ? router.asPath.indexOf('#') : router.asPath.length,
  ]);

  const canonicalURL = canonical + router.asPath.substring(0, _pathSliceLength);

  return (
    <Head>
      {title && <title key="title">{`${title} ${addSiteName ? `${title ? '–' : ''} ${siteName}` : ''}`}</title>}
      {!title && <title key="title">{`${addSiteName ? `${siteName}` : ''}`}</title>}
      <meta name="description" content={description} />
      <meta key="og_type" property="og:type" content={ogType} />
      <meta key="og_title" property="og:title" content={title} />
      <meta key="og_description" property="og:description" content={description} />
      <meta key="og_locale" property="og:locale" content="en_IE" />
      <meta key="og_site_name" property="og:site_name" content={siteName} />
      <meta key="og_url" property="og:url" content={canonicalURL} />
      <meta key="og_site_name" property="og:site_name" content={siteName} />
      <meta key="og_image" property="og:image" content={ogImage} />
      <meta key="og_image:alt" property="og:image:alt" content={`${title} ${siteName ? `| ${siteName}` : ''}`} />
      <meta key="og_image:width" property="og:image:width" content={ogImageWidth} />
      <meta key="og_image:height" property="og:image:height" content={ogImageHeight} />

      <meta name="robots" content={robots} />

      <meta key="twitter:card" name="twitter:card" content="summary_large_image" />
      <meta key="twitter:site" name="twitter:site" content={twitterHandle} />
      <meta key="twitter:creator" name="twitter:creator" content={twitterHandle} />
      <meta key="twitter:title" property="twitter:title" content={title} />
      <meta key="twitter:description" property="twitter:description" content={description} />
    </Head>
  );
}
