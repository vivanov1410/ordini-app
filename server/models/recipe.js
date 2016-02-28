import mongoose from 'mongoose'

const Schema = mongoose.Schema
const recipeSchema = new Schema({
  name: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
})

recipeSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id
    delete ret._id
    delete ret.__v
  },
})

export default mongoose.model('Recipe', recipeSchema)
