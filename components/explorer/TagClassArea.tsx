import React from "react";
import TagClassAreaDraggable from "./TagClassAreaDraggable";
import TagClassAreaDroppable from "./TagClassAreaDroppable";

const TagClassArea = ({
  tagClassId,
  id,
  onRemoveTagClass,
}: TagClassAreaProps) => {
  return (
    <div className="flex-1 ">
      {tagClassId ? (
        <TagClassAreaDraggable
          id={id}
          tagClassId={tagClassId}
          onRemoveTagClass={onRemoveTagClass}
        />
      ) : (
        <TagClassAreaDroppable id={id} />
      )}
    </div>
  );
};

export default TagClassArea;
