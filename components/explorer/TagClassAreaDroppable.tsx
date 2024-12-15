import { useDroppable } from "@dnd-kit/core";
import React from "react";

const TagClassAreaDroppable = ({ id }: TagClassAreaDroppableProps) => {
  const { isOver, setNodeRef } = useDroppable({
    id: `tag-class-area-droppable-${id}`,
    data: { id },
  });

  return (
    <div
      ref={setNodeRef}
      className="flex h-full items-center justify-center rounded-md bg-gray-100 border-2 border-gray-300 border-dashed"
    >
      <p className="text-gray-400">
        Drag and drop<br></br>tag class here
      </p>
    </div>
  );
};

export default TagClassAreaDroppable;
