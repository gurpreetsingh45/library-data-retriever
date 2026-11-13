import useSWR from 'swr';
import Error from 'next/error';
import Link from 'next/link';
import { Button, Card } from 'react-bootstrap';

export default function BookCard({ workId }) {
  const { data, error, isLoading } = useSWR(
    `https://openlibrary.org/works/${workId}.json`
  );

  if (isLoading) return null;

  if (error || !data) return <Error statusCode={404} />;

  return (
    <Card>
      <Card.Img
        variant="top"
        onError={(event) => {
          event.target.onerror = null; // Remove the event handler to prevent infinite loop
          event.target.src =
            "https://placehold.co/400x600?text=Cover+Not+Available";
        }}
        className="img-fluid w-100"
        src={`https://covers.openlibrary.org/b/id/${data?.covers?.[0]}-M.jpg`}
        alt="Cover Image"
      />
      <Card.Body>
        <Card.Title>{data.title || ""}</Card.Title>
        <Card.Text>{data.first_publish_date || "N/A"}</Card.Text>
        <Button as={Link} href={`/works/${workId}`} variant="primary">
          View Book
        </Button>
      </Card.Body>
    </Card>
  );
}
