declare type TagClass = {
  id: number;
  name: string;
};

declare type Tag = {
  id: number;
  tagClassId: number;
  name: string;
};

declare type ExplorerFile = {
  id: number;
  name: string;
  tags: number[];
};

declare type TagClassContainerProps = {
  tagClasses: TagClass[];
};

declare type TagClassAreaProps = {
  id: number;
  tagClassId?: number;
  onRemoveTagClass: (tagClassId: number) => void;
};

declare type TagClassAreaDraggableProps = {
  id: number;
  tagClassId: number;
  onRemoveTagClass: (tagClassId: number) => void;
};

declare type TagClassDraggableProps = {
  tagClass: TagClass;
};

declare type TagClassAreaDroppableProps = {
  id: number;
};

declare type FilterAreaProps = {
  tagClasses: (TagClass | undefined)[];
  onRemoveTagClass: (tagClassId: number) => void;
};
