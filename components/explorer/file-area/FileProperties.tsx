import ExplorerContext, { ExplorerDispatchContext } from '@/contexts/ExplorerContext'
import { updateFile } from '@/lib/actions/file.actions'
import type { KeywordType } from '@/lib/models/keyword.model'
import type { FilePropertiesProps } from '@/types/explorer'
import {
    Combobox,
    ComboboxButton,
    ComboboxInput,
    ComboboxOption,
    ComboboxOptions,
    Dialog,
    DialogPanel,
    Field,
    Input,
    Label,
    Transition,
    TransitionChild,
} from '@headlessui/react'
import Image from 'next/image'
import React, { Fragment, useContext, useEffect, useState, type FormEvent, type KeyboardEvent } from 'react'
import TagsInput from './TagsInput'
import { getAllTags } from '@/lib/actions/tag.actions'
import type { TagType } from '@/lib/models/tag.model'
import { LoadingButton } from '@mui/lab'
import { Save } from '@mui/icons-material'
import { Divider, IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

const FileProperties = ({ isOpen, closeModal, file }: FilePropertiesProps) => {
    const { keywords } = useContext(ExplorerContext)
    const { fetchFiles } = useContext(ExplorerDispatchContext)

    const [allTags, setAllTags] = useState<TagType[]>([])
    const [isUpdating, setIsUpdating] = useState(false)

    const [disabled, setDisabled] = useState(true)

    useEffect(() => {
        setIsUpdating(false)
        setDisabled(true)

        const fetchAllTags = async () => {
            setAllTags(await getAllTags())
        }
        if (isOpen) fetchAllTags()
    }, [isOpen])

    const saveFileProperties = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (isUpdating) return

        const formData = new FormData(e.currentTarget)
        const name = formData.get('name') as string
        const keyword = formData.get('keyword') as string
        const tags = formData.get('tags') as string

        setIsUpdating(true)
        await updateFile(file.id, name)
        await fetchFiles()
        setIsUpdating(false)

        closeModal()
    }

    const preventEnterSubmit = (e: KeyboardEvent<HTMLFormElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault()
        }
    }

    const tryCloseModal = () => {
        if (isUpdating) return

        closeModal()
    }

    const onNameChange = (e: FormEvent<HTMLInputElement>) => {
        const name = e.currentTarget.value
        const newDisabled = name === file.name
        if (newDisabled !== disabled) setDisabled(newDisabled)
    }

    return (
        <>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={tryCloseModal}>
                    <TransitionChild
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0">
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </TransitionChild>
                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <TransitionChild
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0"
                                enterTo="opacity-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0">
                                <DialogPanel className="w-full max-w-3xl max-h[90vh] overflow-y-auto transform rounded-2xl bg-[#23272f] shadow-xsl transition-all flex flex-col">
                                    <div className="flex justify-between items-center px-4 py-7">
                                        <h1 className="text-24 font-medium">File Properties</h1>
                                        <IconButton
                                            disabled={isUpdating}
                                            onClick={() => {
                                                tryCloseModal()
                                            }}>
                                            <CloseIcon />
                                        </IconButton>
                                    </div>

                                    <Divider variant="middle" component="div" />
                                    <div className="p-4 mt-5 flex w-full">
                                        <form
                                            className="flex flex-col gap-6 w-full"
                                            onSubmit={saveFileProperties}
                                            onKeyDown={preventEnterSubmit}>
                                            <Field className="flex flex-col gap-2 items-start">
                                                <Label htmlFor="name">Name</Label>
                                                <Input
                                                    name="name"
                                                    type="text"
                                                    className="bg-[#343a46] w-full rounded-md text-16 p-3 data-[focus]:outline-none"
                                                    placeholder="File name"
                                                    defaultValue={file.name}
                                                    onChange={(e) => onNameChange(e)}
                                                />
                                            </Field>
                                            <Field className="flex flex-col gap-2 items-start">
                                                <Label htmlFor="keyword">Keyword</Label>
                                                <Combobox>
                                                    <div className="relative w-full">
                                                        <ComboboxInput
                                                            name="keyword"
                                                            aria-label="Keyword"
                                                            displayValue={(keyword: KeywordType) => keyword?.name}
                                                            className="bg-[#343a46] w-full rounded-md text-16 p-3 data-[focus]:outline-none"
                                                        />
                                                        <ComboboxButton className="group absolute inset-y-0 right-0 px-2.5">
                                                            <Image
                                                                src="./icons/caret-down.svg"
                                                                alt="Drop"
                                                                width={16}
                                                                height={16}
                                                            />
                                                        </ComboboxButton>
                                                    </div>

                                                    <ComboboxOptions
                                                        anchor="bottom"
                                                        transition
                                                        className="w-[var(--input-width)] bg-[#343a46] flex flex-col gap-1 rounded-md p-2 transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0">
                                                        {keywords.map((keyword) => (
                                                            <ComboboxOption
                                                                key={keyword.id}
                                                                value={keyword}
                                                                className="group hover:bg-[#404451] rounded-md p-3">
                                                                {keyword.name}
                                                            </ComboboxOption>
                                                        ))}
                                                    </ComboboxOptions>
                                                </Combobox>
                                            </Field>
                                            <Field className="flex flex-col gap-2 items-start">
                                                <Label htmlFor="tags">Tags</Label>
                                                <TagsInput
                                                    name="tags"
                                                    defaultValue={file.tags.map((tagId) => {
                                                        const tag = allTags.find((tag) => tag.id === tagId)
                                                        return tag?.name ?? ''
                                                    })}
                                                    placeholder="Insert and press enter to add new tag"
                                                />
                                            </Field>
                                            <div className="flex justify-end mt-5">
                                                <LoadingButton
                                                    variant="contained"
                                                    type="submit"
                                                    startIcon={<Save />}
                                                    loadingPosition="start"
                                                    loading={isUpdating}
                                                    disabled={disabled}>
                                                    Save
                                                </LoadingButton>
                                            </div>
                                        </form>
                                    </div>
                                </DialogPanel>
                            </TransitionChild>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}

export default FileProperties
