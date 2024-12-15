"use client";

import { getAllTagClasses } from "@/lib/explorer";
import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import TagClassDraggable from "./TagClassDraggable";

const TagClassContainer = ({ tagClasses }: TagClassContainerProps) => {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded((prev) => !prev);
  };

  return (
    <section className="flex flex-col gap-2">
      <div className="flex gap-2">
        <h2 className="text-gray-600 font-medium">Tag class</h2>
        <Image
          src="/icons/expand.svg"
          width={16}
          height={16}
          alt="Add tag class"
          className="cursor-pointer"
          onClick={handleExpandClick}
        />
      </div>
      <div
        className={cn(
          "bg-white",
          "w-full",
          "h-full",
          "rounded-md",
          "transition-all"
        )}
      >
        <div className="m-1 flex flex-wrap">
          {tagClasses.map((tagClass) => (
            <TagClassDraggable key={tagClass.id} tagClass={tagClass} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TagClassContainer;
