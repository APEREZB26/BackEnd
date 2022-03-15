const {Schema, model} = require('mongoose')

const countrySchema = new Schema({
    content: String,
    date: Date,
    nationality: String
})

countrySchema.set('toJSON', {
    transform: (document , returnedObject) => {
        returnedObject.id = returnedObject._id
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const CountryModel = model('Country', countrySchema)

module.exports= CountryModel
