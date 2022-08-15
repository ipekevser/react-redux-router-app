import { Fragment, useEffect } from "react";
import { useParams, Route, Link, Routes } from "react-router-dom";

import Comments from "../components/comments/Comments";
import HighlightedQuote from "../components/quotes/HighlightedQuote";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import useHttp from "../hooks/use-http";
import { getSingleQuote } from "../lib/api";

/* const DUMMY_QUOTES = [
  {
    id: "q1",
    author: "John",
    text: "Learning React is fun!",
  },
  {
    id: "q2",
    author: "Mike",
    text: "Learning Js is fun!",
  },
]; */

const QuoteDetail = () => {
  /* const match = useRouteMatch(); */
  const params = useParams();

  const { quoteId } = params;

  const {
    sendRequest,
    status,
    data: loadedQuote,
    error,
  } = useHttp(getSingleQuote, true);

  /*   const quote = DUMMY_QUOTES.find((qoute) => qoute.id === params.quoteId); */

  useEffect(() => {
    sendRequest(quoteId);
  }, [sendRequest, quoteId]);

  if (status === "pending") {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return <p className="centered">{error}</p>;
  }
  if (!loadedQuote.text) {
    return <p>No quote found!</p>;
  }
  return (
    <Fragment>
      <HighlightedQuote text={loadedQuote.text} author={loadedQuote.author} />
      <Routes>
        <Route
          path={"*"}
          className="centered"
          element={
            <Link className="btn--flat centered" to="comments">
              Load Comments
            </Link>
          }
        />
        <Route path={"comments"} element={<Comments />} />
      </Routes>
    </Fragment>
  );
};

export default QuoteDetail;

//`/quotes/${params.quoteId}`
