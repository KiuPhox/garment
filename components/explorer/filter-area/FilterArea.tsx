import React, { useContext } from 'react'
import TagsContext from '@/contexts/TagsContext'
import FileArea from '../file-area/FileArea'
import TagClassArea from './TagClassArea'

const FilterArea = () => {
    const { tagClassAreas } = useContext(TagsContext)

    const notEmptyTagAreas = tagClassAreas.filter(
        (tagArea) => tagArea !== undefined,
    )
    return (
        <section className="flex flex-col gap-2 h-full">
            <h2 className="text-gray-600 font-medium">Filter area</h2>
            <div className="h-full flex flex-row gap-10">
                {notEmptyTagAreas.map((tagArea, index) => {
                    return (
                        <TagClassArea
                            key={index}
                            id={index}
                            tagClassId={tagArea.tagClassId}
                        />
                    )
                })}
                {notEmptyTagAreas.length < 3 && (
                    <TagClassArea
                        id={notEmptyTagAreas.length}
                        tagClassId={
                            tagClassAreas[notEmptyTagAreas.length]?.tagClassId
                        }
                    />
                )}

                <FileArea />
            </div>
        </section>
    )
}

export default FilterArea
