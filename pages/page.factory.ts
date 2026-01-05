import { Page } from "@playwright/test";
import { LoginPage } from "./login.page";
import { BasePage } from "./base.page";
import { ArticlesPage } from "./articles.page";

export class PageFactory {
  constructor(private page: Page) {}

  get loginPage(): LoginPage {
    return new LoginPage(this.page);
  }

  get basePage(): BasePage {
    return new BasePage(this.page);
  }

  get articlesPage(): ArticlesPage {
    return new ArticlesPage(this.page);
  }
} 
