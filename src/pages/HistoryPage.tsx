import RevisionCard from '@/components/history/RevisionCard';
import { IRevision } from '@/interfaces/main';
import { useGetRevisionsQueries } from '@/queries/articles.query';
import { useLocation } from 'react-router-dom';
const HistoryPage = () => {
  const { state } = useLocation();
  if (!state) {
    return <div>Error: No revision data available.</div>;
  }
  const { data: revisions, isLoading, error } = useGetRevisionsQueries(state.slug);

  if (isLoading) return <p>Loading...</p>;
  if (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return <p>Error: {errorMessage}</p>;
  }
  console.log('1 : ', revisions);
  const revisionList: IRevision[] = revisions?.data.data ?? [];
  console.log('2 : ', revisionList);

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
