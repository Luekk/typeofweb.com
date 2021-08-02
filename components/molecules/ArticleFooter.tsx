import Image from 'next/image';
import React, { memo } from 'react';

import Pattern from '../../images/typeofweb-pattern.svg';
import { SectionTitle } from '../atoms/SectionTitle';

import { social } from './SocialWidget';

import type { Author } from './ArticleMeta';

interface ArticleFooterProps {
  readonly authors: readonly Author[];
}

export const ArticleFooter = memo<ArticleFooterProps>(({ authors }) => {
  return (
    <footer>
      <Pattern className="mb-6 mt-8 mx-auto w-32 text-green-500" />
      <div className="flex flex-col items-start mb-4 mt-4 mx-auto px-4 max-w-lg text-left">
        <SectionTitle level="none" size="small" pad={false}>
          Autorzy
        </SectionTitle>
        {authors.map((a) => {
          return (
            <div key={a.slug} itemScope itemType="http://schema.org/Person" itemProp="author">
              <span className="flex items-center my-2">
                <span className={`inline-flex border-2 rounded-full border-gray-100 mr-4`}>
                  <Image
                    src={a.avatarUrl + `?s=${96}`}
                    width={48}
                    height={48}
                    layout="fixed"
                    alt={`Zdjęcie ${a.displayName}`}
                    className={`rounded-full`}
                  />
                </span>

                <span
                  className={` text-gray-800 inline-block text-lg font-sans font-bold leading-none`}
                  itemProp="name"
                >
                  {a.displayName}
                </span>
                <span className="inline-flex -mt-2 ml-3">
                  {social
                    .filter((s) => s.slug in a && !!a[s.slug])
                    .map(({ icon: Icon, slug, label }) => (
                      <a
                        key={slug}
                        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- filtered above
                        href={a[slug]!}
                        aria-label={`${a.displayName} ${label}`}
                        title={`${a.displayName} ${label}`}
                        className="text-gray-700 hover:text-green-500 transition-colors"
                      >
                        <Icon className="mx-2 w-5 fill-current" />
                      </a>
                    ))}
                </span>
              </span>
              <p className="mb-4 text-gray-900">{a.description}</p>
            </div>
          );
        })}
      </div>
    </footer>
  );
});
ArticleFooter.displayName = 'ArticleFooter';
