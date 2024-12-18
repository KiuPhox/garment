import React from 'react'
import TagClassArea from './TagClassArea'
import FileArea from './FileArea'

const FilterArea = ({ tagClasses, onRemoveTagClass }: FilterAreaProps) => {
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
                            onRemoveTagClass={onRemoveTagClass}
                        />
                    )
                })}
                {notEmptyTagClasses.length < 3 && (
                    <TagClassArea
                        id={notEmptyTagClasses.length}
                        tagClassId={tagClasses[notEmptyTagClasses.length]?.id}
                        onRemoveTagClass={onRemoveTagClass}
                    />
                )}

                <FileArea />
            </div>
        </section>
    )
}

export default FilterArea
