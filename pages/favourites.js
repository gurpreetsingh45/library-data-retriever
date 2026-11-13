import { useAtom } from 'jotai';
import { Row, Col } from 'react-bootstrap';
import { favouritesAtom } from '@/store';
import PageHeader from '@/components/PageHeader';
import BookCard from '@/components/BookCard';

export default function Favourites() {
  const [favouritesList] = useAtom(favouritesAtom);

  if (favouritesList.length === 0) {
    return (
      <PageHeader
        text="Nothing Here"
        subtext="Add a book to your favourites to see it here"
      />
    );
  }

  return (
    <>
      <PageHeader text="Favourites" subtext="Your Favourite Books" />
      <Row className="gy-4">
        {favouritesList.map((workId) => (
          <Col lg={3} md={6} key={workId}>
            <BookCard workId={workId} />
          </Col>
        ))}
      </Row>
    </>
  );
}
