import { model, models, Schema } from 'mongoose'

const tagSchema = new Schema({
    name: { type: String, required: true },
    keywordId: { type: Schema.Types.ObjectId, require: true, ref: 'Keyword' },
})

const Tag = models.Tag || model('Tag', tagSchema)

export default Tag
export type TagType = {
    id: string
    name: string
    keywordId: string
}
