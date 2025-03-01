import { IRevision } from '@/interfaces/main';

export const mapRevision = (data: any): IRevision => ({
  id: data.id,
  title: data.title,
  description: data.description,
  body: data.body,
  createdAt: data.created_at,
  tagList: data.tags,
});
