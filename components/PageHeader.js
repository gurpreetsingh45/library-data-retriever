export default function PageHeader({ text, subtext }) {
  return (
    <>
      <div className="bg-light border rounded-3 p-4 p-md-5">
        <h1 className="display-5 fw-bold mb-0">{text}</h1>
        {subtext && <p className="lead text-muted mt-2 mb-0">{subtext}</p>}
      </div>
      <br />
    </>
  );
}
