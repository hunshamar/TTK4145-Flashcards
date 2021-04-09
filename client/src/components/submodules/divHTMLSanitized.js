import DOMPurify from "dompurify";
import ReactMarkdown from "react-markdown";

const DivHTMLSanatized = ({ text, style }) => {
  return <ReactMarkdown style={style}>{text}</ReactMarkdown>;
};

export default DivHTMLSanatized;
