const { model, Schema } = require('mongoose')
const bcrypt = require('bcrypt')

const SALT_ROUNDS = 6 // level of encryption using bcrypt

const userSchema = new Schema({
    name: { type: String, required: true },
    email: {
        type: String,
        unique: true,
        trim: true,
        lowercase: true,
        required: true
    },
    password: {
        type: String,
        trim: true,
        minLength: 3,
        required: true
    }
}, {
    timestamps: true,
    toJSON: {
        // doc -> The mongoose document being transformed
        // ret -> The plain Javascript object representation of the document that will be serialized to JSON
        // password field is not displayed when sending data to clients or other parts of the application
        // in other words I should not be able to see it in post man as well?
        transform: function(doc, ret) {
            delete ret.password
            return ret
        }
    }
})

// encrypt password before saving to the database
userSchema.pre('save', async function(next) {
     // 'this' is the use document
     if (!this.isModified('password')) return next()
     // update the password with the computed hash
     this.password = await bcrypt.hash(this.password, SALT_ROUNDS)
     return next()
})

module.exports = model('User', userSchema)