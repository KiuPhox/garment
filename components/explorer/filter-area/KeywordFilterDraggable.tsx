import type { Dnd } from '@/types/dnd'
import type { KeywordFilterDraggableProps } from '@/types/explorer'
import Utils from '@/utils'
import { useDraggable } from '@dnd-kit/core'
import { IconButton } from '@mui/material'
import React from 'react'
import CloseIcon from '@mui/icons-material/Close'

const { String: S } = Utils

const KeywordFilterDraggable = ({ keyword, filterAreaId, onRemoveClicked }: KeywordFilterDraggableProps) => {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: `keyword-${keyword.id}`,
        data: {
            keyword,
            filterAreaId,
            type: 'KeywordFromFilter',
        } as Dnd.KeywordFromFilterData,
    })

    const style = transform
        ? {
              transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
              overflow: 'visible',
          }
        : undefined

    const keywordName = keyword.name.length > 28 ? S.getShortName(keyword.name, 28).concat('...') : keyword.name

    return (
        <div
            ref={setNodeRef}
            style={style}
            className="flex items-center justify-between bg-[#404451] px-3 py-2 rounded-md ">
            <div {...attributes} {...listeners} className="w-full">
                {keywordName}
            </div>
            <IconButton onClick={onRemoveClicked} size="small">
                <CloseIcon fontSize="small" />
            </IconButton>
        </div>
    )
}

export default KeywordFilterDraggable
