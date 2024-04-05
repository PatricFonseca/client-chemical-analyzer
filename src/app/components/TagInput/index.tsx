import React from "react";
import { WithContext as ReactTags, Tag } from "react-tag-input";

interface TagInputProps {
  tags: Tag[];
  setTags: (tags: Tag[]) => void;
}

const KeyCodes = {
  comma: 188,
  enter: 13,
};

export default function TagInput({ tags, setTags }: TagInputProps) {
  // const [tags, setTags] = React.useState<Tag[]>([]);

  const delimiters = [KeyCodes.comma, KeyCodes.enter];

  const handleDelete = (i: number) => {
    setTags(tags.filter((tag, index) => index !== i));
  };

  const handleAddition = (tag: Tag) => {
    setTags([...tags, tag]);
    // setTagsP([...tags, tag]); //adding to parent state
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
        tag: " rounded-full bg-gray-300 text-typography pl-2 mr-1 p-[0.02rem]",
        remove:
          "text-danger hover:bg-red-900 rounded-full  hover:text-white ml-1 p-1 ",
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
