import RevisionCard from '@/components/history/RevisionCard';
import { IRevision } from '@/interfaces/main';
import { useGetRevisionsQueries } from '@/queries/articles.query';
import { useLocation } from 'react-router-dom';
const HistoryPage = () => {
  const { state } = useLocation();

  const { data: revisions, isLoading, error } = useGetRevisionsQueries(state.slug);

  if (isLoading) return <p>Loading...</p>;
  if (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return <p>Error: {errorMessage}</p>;
  }
  const revisionList: IRevision[] = revisions?.data.data ?? [];

  return (
    <>
      <div className="container page">
        <div className="col-md-12">
          {revisionList.length > 0 ? (
            <>
              {revisionList.map((revision) => {
                return <RevisionCard key={revision.id} article={revision} slug={state.slug} />;
              })}
            </>
          ) : (
            <div>No articles are here... yet.</div>
          )}
        </div>
      </div>
    </>
  );
};

export default HistoryPage;
// <>
//   <div role="presentation" className="article-preview">
//     <div className="article-meta">
//       <a href="profile.html">
//         <img src={article.author.image} alt="profile" />
//       </a>
//       <div className="info">
//         <Link to={`/profile/${article.author.username}`} state={article.author.username} className="author">
//           {article.author.username}
//         </Link>
//         <span className="date">{convertToDate(article.createdAt)}</span>
//       </div>
//       <button
//         type="button"
//         className={`btn ${article.favorited ? 'btn-primary' : 'btn-outline-primary'} btn-sm pull-xs-right`}
//         onClick={() => onToggleFavorite()}
//       >
//         <i className="ion-heart"></i> {article.favoritesCount}
//       </button>
//     </div>
//     <Link to={`/article/${article.slug}`} state={article.slug} className="preview-link">
//       <h1>{article.title}</h1>
//       <p>{article.description}</p>
//       <span>Read more...</span>
//     </Link>
//   </div>
// </>
