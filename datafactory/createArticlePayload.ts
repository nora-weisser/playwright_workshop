import { faker } from '@faker-js/faker';

export type ArticlePayload = {
    title: string;
    description: string;
    body: string;
    tagList: string[];
};

export type ArticleFactoryOptions = {
  tagsCount?: number;
};

export function getArticlePayload(
  overrides: Partial<ArticlePayload> = {},
  opts: ArticleFactoryOptions = {}
): ArticlePayload {

  const tagsCount = opts.tagsCount ?? faker.number.int({ min: 1, max: 3 });

  const base = {
    title: overrides.title ?? `${faker.lorem.words(3)} ${faker.string.uuid().slice(0, 8)}`,
    description: overrides.description ?? faker.lorem.sentence(),
    body: overrides.body ?? faker.lorem.paragraphs(2),
    tagList: overrides.tagList ?? Array.from({ length: tagsCount }, () => faker.word.noun().toLowerCase()),
  };

  return { ...base, ...overrides };
}