import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './base.page';
import { ArticlePayload } from '../datafactory/createArticlePayload';

export class ArticlesPage extends BasePage {
  readonly title: Locator;
  readonly description: Locator;
  readonly body: Locator;
  readonly tags: Locator;
  readonly publishButton: Locator;
  readonly editArticleLink: Locator;
  readonly deleteButton: Locator;
  readonly heading: Locator;
  readonly articleContent: Locator;

  constructor(page: Page) {
    super(page);
    this.title = page.getByPlaceholder('Article Title');
    this.description = page.getByPlaceholder("What's this article about?");
    this.body = page.getByPlaceholder('Write your article (in markdown)');
    this.tags = page.getByPlaceholder('Enter tags');
    this.publishButton = page.getByRole('button', { name: 'Publish Article' });
    this.editArticleLink = page.locator('.banner').getByRole('link', { name: 'Edit Article' });
    this.deleteButton = page.locator('.banner').getByRole('button', { name: 'Delete Article' });
    this.heading = page.getByRole('heading');
    this.articleContent = page.locator('.article-content');
  }

  async gotoEditor() {
    await this.goto('/editor');
  }

  async fillArticleForm(article: ArticlePayload) {
    await this.title.fill(article.title);
    await this.description.fill(article.description);
    await this.body.fill(article.body);
    await this.tags.fill(article.tagList.join(' '));
  }

  async publish() {
    await this.publishButton.click();
  }

  async clickEditArticle() {
    await this.editArticleLink.click();
  }

  async deleteArticle() {
    await this.deleteButton.click();
  }

  async expectHeading(text: string) {
    await expect(this.heading).toHaveText(text);
  }

  async expectArticleContentContains(text: string) {
    await expect(this.articleContent).toContainText(text);
  }
}
