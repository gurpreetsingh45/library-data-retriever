import useSWR from "swr";
import { useState } from "react";
import { useRouter } from "next/router";
import { Pagination, Table } from "react-bootstrap";
import PageHeader from "@/components/PageHeader";

export default function Books() {
  const [page, setPage] = useState(1);
  const router = useRouter();

  // Serialize the URL query parameters (ie: ?author=Douglas&title=Galaxy)
  // into an Open Library search query (ie: "author:Douglas AND title:Galaxy")
  let queryString = { ...router.query };
  let qParts = [];

  Object.entries(queryString).forEach(([key, value]) => {
    qParts.push(`${key}:${value}`);
  });

  if (qParts.length > 0) {
    queryString = qParts.join(" AND ");
  }

  // router.query is empty until the router is ready, so hold off on the request until then
  const { data, error } = useSWR(
    qParts.length > 0
      ? `https://openlibrary.org/search.json?q=${encodeURIComponent(queryString)}&page=${page}&limit=10&fields=key,title,first_publish_year`
      : null,
    { keepPreviousData: true },
  );

  const subtext =
    qParts.length > 0
      ? Object.keys(router.query).map((key) => (
          <span key={key}>
            <strong>{key}:</strong> {router.query[key]}{" "}
          </span>
        ))
      : null;

  function previous() {
    if (page > 1) setPage(page - 1);
  }

  function next() {
    setPage(page + 1);
  }

  return (
    <>
      <PageHeader text="Search Results" subtext={subtext} />

      {error && <p>Unable to load books: {error.message}</p>}

      <Table striped hover>
        <thead>
          <tr>
            <th>Title</th>
            <th>First Published</th>
          </tr>
        </thead>
        <tbody>
          {data?.docs?.map((book) => (
            <tr key={book.key} onClick={() => router.push(book.key)}>
              <td>{book.title}</td>
              <td>{book.first_publish_year || "N/A"}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Pagination>
        <Pagination.Prev onClick={previous} />
        <Pagination.Item>{page}</Pagination.Item>
        <Pagination.Next onClick={next} />
      </Pagination>
    </>
  );
}
