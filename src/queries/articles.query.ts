import { QUERY_ARTICLES_KEY, QUERY_ARTICLE_KEY, QUERY_COMMENTS_KEY, QUERY_TAG_KEY } from '@/constants/query.constant';
import {
  getArticle,
  getArticles,
  createArticle,
  updateArticle,
  deleteArticle,
  getComments,
  createComment,
  deleteComment,
  favoriteArticle,
  unfavoriteArticle,
  getRevisions,
  getRevision,
  revertArticle,
} from '@/repositories/articles/articlesRepository';
import { getTags } from '@/repositories/tags/tagsRepository';
import { useMutation, useQueries, useQuery } from '@tanstack/react-query';

export const useGetArticlesQueries = (isGlobal: boolean, page: number, selectedTag: string) => {
  return useQueries({
    queries: [
      {
        queryKey: [QUERY_ARTICLES_KEY, isGlobal, selectedTag, page],
        queryFn: () => getArticles({ isGlobal, selectedTag, page }).then((res) => res.data),
        staleTime: 20000,
      },
      {
        queryKey: [QUERY_TAG_KEY],
        queryFn: () => getTags().then((res) => res.data.tags),
        staleTime: 20000,
      },
    ],
  });
};

export const useGetArticleQueries = (slug: string) => {
  return useQueries({
    queries: [
      {
        queryKey: [QUERY_ARTICLE_KEY, slug],
        queryFn: () => getArticle({ slug }).then((res) => res.data.article),
        staleTime: 20000,
      },
      {
        queryKey: [QUERY_COMMENTS_KEY, slug],
        queryFn: () => getComments({ slug }).then((res) => res.data.comments),
        staleTime: 20000,
      },
    ],
  });
};

export const useGetRevisionsQueries = (slug: string) => {
  return useQuery({
    queryKey: ['revisions', slug],
    queryFn: () => getRevisions({ slug }),
    enabled: !!slug,
  });
};
export const useGetRevisionQueries = (slug: string, id: number) => {
  return useQuery({
    queryKey: ['revisions', slug],
    queryFn: () => getRevision({ slug, id }),
    enabled: !!slug,
  });
};
export const useRevertQueries = (slug: string, id: number) => {
  return useQuery({
    queryKey: ['revisions', slug],
    queryFn: () => revertArticle({ slug, id }),
    enabled: !!slug,
  });
};

export const useCreateArticleMutation = () => useMutation(createArticle);

export const useUpdateArticleMutation = () => useMutation(updateArticle);

export const useDeleteArticleMutation = () => useMutation(deleteArticle);

export const useCreateCommentMutation = () => useMutation(createComment);

export const useDeleteCommentMutation = () => useMutation(deleteComment);

export const useFavoriteArticleMutation = () => useMutation(favoriteArticle);

export const useUnfavoriteArticleMutation = () => useMutation(unfavoriteArticle);
