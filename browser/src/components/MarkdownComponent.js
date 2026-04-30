//  This component accepts markdown content as a prop and renders it using the react-markdown library.
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
