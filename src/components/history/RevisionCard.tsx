import { Link, useNavigate } from 'react-router-dom';
import { IRevision } from '@/interfaces/main';
import { revertArticle } from '@/repositories/articles/articlesRepository';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
interface IRevisionProps {
  article: IRevision;
  slug: string;
}

const RevisionCard = ({ article, slug }: IRevisionProps) => {
  const queryClient = useQueryClient();
  const handleRevert = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await revertArticle({ slug, id: article.id });

      toast.success('Revision reverted successfully!');
      queryClient.invalidateQueries(['revisions', slug]);
    } catch (error) {
      toast.error('Failed to revert the revision.');
    }
  };

  return (
    <div role="presentation" className="article-preview p-4 rounded-lg transition-all duration-300 relative border-2">
      <div className="preview-link block text-lg text-black">{article.createdAt}</div>
      <div className="article-meta">
        <button
          type="button"
          className={`btn ${article.id ? 'btn-primary' : 'btn-outline-primary'} btn-sm pull-xs-right`}
          onClick={handleRevert}
        >
          Revert
        </button>
      </div>
      <Link
        to={`/revision/${article.id}`}
        state={{ slug: slug, revisionId: article.id }}
        className="preview-link block"
      >
        <h1 className="text-lg font-bold">{article.title}</h1>
        <p className="text-gray-700">{article.description}</p>
        <span className="text-green-500 font-semibold">Read more...</span>
      </Link>
    </div>
  );
};

export default RevisionCard;
