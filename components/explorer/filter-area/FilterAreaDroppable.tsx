import type { Dnd } from '@/types/dnd'
import type { FilterAreaDroppableProps } from '@/types/explorer'
import { useDroppable } from '@dnd-kit/core'
import React from 'react'

const FilterAreaDroppable = ({ id }: FilterAreaDroppableProps) => {
    const { setNodeRef } = useDroppable({
        id: `tag-class-area-droppable-${id}`,
        data: {
            filterAreaId: id,
            keyword: undefined,
            type: 'FilterArea',
        } as Dnd.FilterAreaData,
    })

    return (
        <div
            ref={setNodeRef}
            className="flex h-full items-center justify-center rounded-md bg-[#353a46] border-2 border-gray-300 border-dashed">
            <p className="text-gray-400">
                Drag and drop
                <br />
                tag class here
            </p>
        </div>
    )
}

export default FilterAreaDroppable
