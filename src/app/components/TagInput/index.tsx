import React from "react";
import { WithContext as ReactTags, Tag } from "react-tag-input";

const KeyCodes = {
  comma: 188,
  enter: 13,
};

export default function TagInput() {
  const [tags, setTags] = React.useState<Tag[]>([]);

  const delimiters = [KeyCodes.comma, KeyCodes.enter];

  const handleDelete = (i: number) => {
    setTags(tags.filter((tag, index) => index !== i));
  };

  const handleAddition = (tag: Tag) => {
    setTags([...tags, tag]);
  };

  const handleDrag = (tag: Tag, currPos: number, newPos: number) => {
    const newTags = tags.slice();

    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);

    // re-render
    setTags(newTags);
  };

  const handleTagClick = (index: number) => {
    console.log("The tag at index " + index + " was clicked");
  };

  return (
    <ReactTags
      classNames={{
        tagInput: "mt-2",
        tagInputField:
          "rounded bg-primary p-1 border border-secondary ring-3 outline-secondary text-zinc-800 w-full",
        tag: "rounded bg-secondary pl-2 mr-1",
        remove:
          "text-primary hover:bg-danger hover:text-white rounded px-1 ml-2",
        selected: "flex flex-wrap gap-1 ",
      }}
      placeholder="Digite o nome e pressione enter para adicionar..."
      tags={tags}
      // suggestions={suggestions}
      delimiters={delimiters}
      handleDelete={handleDelete}
      handleAddition={handleAddition}
      handleDrag={handleDrag}
      handleTagClick={handleTagClick}
      inputFieldPosition="bottom"
      autocomplete
    />
  );
}
