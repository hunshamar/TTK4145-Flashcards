import ReactMarkdown from "react-markdown";

const StyledReactMarkdown = ({ text, style }) => (
  <div style={{ textAlign: "center", padding: "5px", ...style }}>
    <div style={{ textAlign: "left", display: "inline-block" }}>
      <ReactMarkdown>{text}</ReactMarkdown>
    </div>
  </div>
);

export default StyledReactMarkdown;
