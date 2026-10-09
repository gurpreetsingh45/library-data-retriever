import { useRouter } from 'next/router';
import useSWR from 'swr';
import BookDetails from '@/components/BookDetails';
import Error from 'next/error';
import PageHeader from '@/components/PageHeader';

export default function Work() {
  const router = useRouter();
  const { workId } = router.query;

  // workId is undefined until the router is ready, so hold off on the request until then
  const { data, error, isLoading } = useSWR(
    workId ? `https://openlibrary.org/works/${workId}.json` : null
  );

  if (!router.isReady || isLoading) return null;

  if (error || !data) return <Error statusCode={404} />;

  return (
    <>
      <PageHeader text={data.title} />
      <BookDetails book={data} />
    </>
  );
}
