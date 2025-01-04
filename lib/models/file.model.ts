import { model, models, Schema } from 'mongoose'

const explorerFileSchema = new Schema({
    _id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    tags: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Tag',
        },
    ],
    size: { type: Number, required: true },
    owner: { type: String, required: true },
    type: { type: String, required: true },
})

const ExplorerFile = models.ExplorerFile || model('ExplorerFile', explorerFileSchema, 'files')

export default ExplorerFile
export type ExplorerFileType = {
    id: string
    name: string
    tags: string[]
    size: number
    owner: string
    type: string
}
