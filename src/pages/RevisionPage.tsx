import { useGetRevisionQueries } from '@/queries/articles.query';
import { useLocation } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { mapRevision } from '@/lib/utils/mapRevisionQueries';
import { revertArticle } from '@/repositories/articles/articlesRepository';
import { toast } from 'react-toastify';
import queryClient from '@/queries/queryClient';
import convertToDate from '@/lib/utils/convertToDate';
interface IRevisionPageProps {
  revisionId: number;
  slug: string;
}
const RevisionPage = () => {
  const location = useLocation();
  const state = location.state as IRevisionPageProps | null;
  if (!state) {
    return <div>Error: No revision data available.</div>;
  }
  const { data, isLoading, error } = useGetRevisionQueries(state.slug, state.revisionId);
  const revision = data ? mapRevision(data.data) : undefined;

  if (isLoading) return <p>Loading...</p>;
  if (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return <p>Error: {errorMessage}</p>;
  }
  const handleRevert = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!revision?.id) {
      toast.error('Invalid revision ID.');
      return;
    }
    try {
      await revertArticle({ slug: state?.slug, id: revision?.id });
      toast.success('Revision reverted successfully!');
      queryClient.invalidateQueries(['revisions', state.slug]);
    } catch (error) {
      toast.error('Failed to revert the revision.');
    }
  };

  return (
    <div className="article-page">
      <div className="banner">
        <div className="container">
          <h1>{revision?.title}</h1>
          &nbsp;&nbsp;
          <p className="text-gray-700">{revision?.description}</p>
          <p className="text-gray-700 pull-xs-right">{convertToDate(revision?.createdAt)}</p>
        </div>
      </div>

      <div className="container page">
        <div className="row article-content">
          <div className="col-md-12">
            <ReactMarkdown children={revision?.body ?? ''} remarkPlugins={[remarkGfm]}></ReactMarkdown>
          </div>
        </div>
      </div>
      <div className="container">
        {(revision?.tagList ?? []).map((tag: string) => (
          <li key={tag} className="tag-default tag-pill tag-outline">
            {tag}
          </li>
        ))}
        <button type="button" className="btn btn-success btn-sm pull-xs-right" onClick={handleRevert}>
          Revert
        </button>
      </div>
    </div>
  );
};

export default RevisionPage;
