export interface ICategory {
    sub_categories: any;
    id?: string;
    name: string;
    slug: string;
    description?: string;
    thumbnail: string;
    articles: IArticle;
  }