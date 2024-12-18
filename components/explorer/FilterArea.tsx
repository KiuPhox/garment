import React, { useContext } from 'react'
import TagClassArea from './TagClassArea'
import FileArea from './FileArea'
import TagsContext from '@/contexts/TagsContext'

const FilterArea = () => {
    const { filterTagClasses: tagClasses } = useContext(TagsContext)

    const notEmptyTagClasses = tagClasses.filter((tagClass) => tagClass)
    return (
        <section className="flex flex-col gap-2 h-full">
            <h2 className="text-gray-600 font-medium">Filter area</h2>
            <div className="h-full flex flex-row gap-10">
                {notEmptyTagClasses.map((tagClass, index) => {
                    return (
                        <TagClassArea
                            key={index}
                            id={index}
                            tagClassId={tagClass?.id}
                        />
                    )
                })}
                {notEmptyTagClasses.length < 3 && (
                    <TagClassArea
                        id={notEmptyTagClasses.length}
                        tagClassId={tagClasses[notEmptyTagClasses.length]?.id}
                    />
                )}

                <FileArea />
            </div>
        </section>
    )
}

export default FilterArea
