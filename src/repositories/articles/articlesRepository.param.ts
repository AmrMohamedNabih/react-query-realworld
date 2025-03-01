export interface getArticlesParam {
  isGlobal?: boolean;
  page: number;
  selectedTag?: string;
  username?: string;
  isFavorited?: boolean;
}

export interface getArticleParam {
  slug: string;
}

export interface createArticleParam {
  title: string;
  description: string;
  body: string;
  tagList: string[];
}

export interface updateArticleParam {
  slug: string;
  title: string;
  description: string;
  body: string;
  tagList: string[];
}

export interface deleteArticleParam {
  slug: string;
}

export interface getCommentsParam {
  slug: string;
}

export interface createCommentParam {
  slug: string;
  body: string;
}

export interface deleteCommentParam {
  slug: string;
  id: number;
}

export interface favoriteParam {
  slug: string;
}
export interface getRevisionsParam {
  slug: string;
}
export interface getRevisionParam {
  id: number;
  slug: string;
}
export interface revertArticleParam {
  id: number;
  slug: string;
}
