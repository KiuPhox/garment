import { Input } from '@headlessui/react'
import React, { useEffect, useState, type KeyboardEvent, type MouseEvent } from 'react'

interface TagsInputProps {
    name: string
    defaultValue?: string[]
    placeholder?: string
}

const TagsInput = ({ name, defaultValue = [], placeholder }: TagsInputProps) => {
    const [tags, setTags] = useState<string[]>([])

    useEffect(() => {
        setTags(defaultValue)
    }, [defaultValue])

    const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key !== 'Enter') return
        e.preventDefault()

        const value = e.currentTarget.value.trim()

        if (value && !tags.includes(value)) {
            setTags((prev) => [...prev, value])
            e.currentTarget.value = ''
        }
    }

    const handleMouseDown = (e: MouseEvent<HTMLDivElement>, tag: string) => {
        if (e.button !== 1) return

        e.preventDefault()
        removeTag(tag)
    }

    const removeTag = (tag: string) => {
        setTags((prev) => prev.filter((t) => t !== tag))
    }

    return (
        <div className="flex gap-2 w-full h-[200px] bg-[#343a46] overflow-y-scroll rounded-md">
            <div className="flex flex-wrap gap-2 w-full  p-2 rounded-md justify-start items-start h-min">
                {tags.map((tag, index) => (
                    <div
                        key={index}
                        onMouseDown={(e) => handleMouseDown(e, tag)}
                        className="flex items-center gap-2 bg-gray-500 text-white px-3 py-1 rounded-md h-10">
                        {tag}
                        <button
                            type="button"
                            onClick={() => removeTag(tag)}
                            className="text-red-400 hover:text-red-600">
                            ✕
                        </button>
                    </div>
                ))}
                <Input
                    className="bg-transparent flex-1 min-w-80 data-[focus]:outline-none h-10 px-1"
                    name="tags-input"
                    type="text"
                    placeholder={placeholder}
                    onKeyDown={onKeyDown}
                />
                <Input type="hidden" name={name} value={tags.join(',')} />
            </div>
        </div>
    )
}

export default TagsInput
