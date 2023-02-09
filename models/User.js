
import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
    name: String,
    password: String,
    library: []
  })

module.exports = mongoose.models.User || mongoose.model('User', UserSchema)