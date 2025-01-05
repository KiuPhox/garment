import { model, models, Schema } from 'mongoose'

const keywordSchema = new Schema({
    name: { type: String, required: true },
})

const Keyword = models.Keyword || model('Keyword', keywordSchema)

export default Keyword
export type KeywordType = {
    id: string
    name: string
}
