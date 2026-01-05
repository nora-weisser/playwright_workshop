import { APIRequestContext } from '@playwright/test';
import { ArticlesAPI } from './articles';
import { UsersAPI } from './users';

export class APIHandler {
  constructor(private api: APIRequestContext) {}

  get articlesAPI(): ArticlesAPI {
    return new ArticlesAPI(this.api);
  }

  get usersAPI(): UsersAPI {
    return new UsersAPI(this.api);
  }
}
