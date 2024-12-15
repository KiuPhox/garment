import { files, tagClasses, tags } from "@/constants/explorer";

export function getAllTagClasses(): TagClass[] {
  return tagClasses;
}

export function getTagClassById(id: number): TagClass | undefined {
  return tagClasses.find((tagClass) => tagClass.id === id);
}

export function getAllTagsByTagClass(tagClassId: number): Tag[] {
  return tags.filter((tag) => tag.tagClassId === tagClassId);
}

export function getTagById(id: number): Tag | undefined {
  return tags.find((tag) => tag.id === id);
}

export function getAllFilesByTags(
  tagIds: number[]
): ExplorerFile[] | undefined {
  return files.filter((file) =>
    tagIds.every((tagId) => file.tags.includes(tagId))
  );
}
