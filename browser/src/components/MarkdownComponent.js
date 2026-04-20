import Markdown from "react-markdown";

const MarkdownComponent = ({ markdownData }) => {
  return (
    <div>
      <Markdown>
        {markdownData?.content || "No description available."}
      </Markdown>
    </div>
  );
};

export default MarkdownComponent;
