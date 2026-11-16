/********************************************************************************
 * WEB422 – Assignment 02
 *
 * I declare that this assignment is my own work in accordance with Seneca's
 * Academic Integrity Policy:
 *
 * https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html
 *
 * Name: Gurpreet Singh Student ID: 143124246 Date: 15-11-2026
 *
 ********************************************************************************/
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { Button, Col, Form, Row } from "react-bootstrap";
import PageHeader from "@/components/PageHeader";

export default function Home() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      author: "",
      title: "",
      subject: "",
      language: "",
      first_publish_year: "",
    },
  });

  function submitForm(data) {
    router.push({
      pathname: "/books",
      query: Object.fromEntries(
        Object.entries(data).filter(([key, value]) => value !== ""),
      ),
    });
  }

  return (
    <>
      <PageHeader
        text="Search"
        subtext="Find books in the Open Library by author, title, subject and more"
      />

      <Form onSubmit={handleSubmit(submitForm)} noValidate>
        <Row>
          <Col xs={12}>
            <Form.Group controlId="author" className="mb-3">
              <Form.Label>Author</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter author"
                className={errors.author ? "is-invalid" : ""}
                {...register("author", { required: true })}
              />
              {errors.author?.type === "required" && (
                <div className="invalid-feedback">Author is required</div>
              )}
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col lg={6}>
            <Form.Group controlId="title" className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter title"
                {...register("title")}
              />
            </Form.Group>
          </Col>
          <Col lg={6}>
            <Form.Group controlId="subject" className="mb-3">
              <Form.Label>Subject (contains)</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter subject"
                {...register("subject")}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col lg={6}>
            <Form.Group controlId="language" className="mb-3">
              <Form.Label>Language Code</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter language code (ie: eng)"
                maxLength={3}
                {...register("language")}
              />
            </Form.Group>
          </Col>
          <Col lg={6}>
            <Form.Group controlId="first_publish_year" className="mb-3">
              <Form.Label>First Published (Year)</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter year (ie: 1979)"
                {...register("first_publish_year")}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <Button variant="primary" type="submit" className="w-100">
              Search
            </Button>
          </Col>
        </Row>
      </Form>
    </>
  );
}
