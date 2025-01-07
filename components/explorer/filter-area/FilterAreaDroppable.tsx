import type { Dnd } from '@/types/dnd'
import type { FilterAreaDroppableProps } from '@/types/explorer'
import { useDroppable } from '@dnd-kit/core'
import { Card, CardContent, Typography } from '@mui/material'
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
        <Card ref={setNodeRef} variant="outlined" className="flex h-full items-center justify-center">
            <CardContent>
                <Typography>
                    Drag and drop
                    <br />
                    tag class here
                </Typography>
            </CardContent>
        </Card>
    )
}

export default FilterAreaDroppable
