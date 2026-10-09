import Link from 'next/link';
import { Card } from 'react-bootstrap';
import BookDetails from '@/components/BookDetails';
import PageHeader from '@/components/PageHeader';

export async function getStaticProps() {
  const res = await fetch('https://openlibrary.org/works/OL453657W.json');
  const data = await res.json();

  return { props: { book: data } };
}

export default function About(props) {
  return (
    <>
      <PageHeader text="About the Developer: Gurpreet Singh" />
      <Card className="bg-light">
        <Card.Body>
          <p>
            I'm Gurpreet Singh, a student studying Computer Programming program
            at Seneca, currently taking course WEB422. This app uses React,
            Next.js and React-Bootstrap to browse data from the Open Library API.
          </p>
          <p>
            The book featured below is <em>{props.book.title}</em>, the first
            novel in Terry Pratchett's Discworld series. You can{' '}
            <Link href="/">browse more of his novels</Link> on the home page.
          </p>
        </Card.Body>
      </Card>
      <br />
      <BookDetails book={props.book} />
    </>
  );
}
