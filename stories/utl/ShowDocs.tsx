import React, { useState, useEffect } from "react";
import Markdown from "react-markdown";
import "./index.css";
const ShowDocs = (props: any) => {
  const [markdown, setMarkdown] = useState("");
  useEffect(() => {
    fetch(props.md)
      .then((res) => res.text())
      .then((text) => setMarkdown(text));
  }, []);
  return <Markdown>{markdown}</Markdown>;
  return <>123</>;
};

export default ShowDocs;
