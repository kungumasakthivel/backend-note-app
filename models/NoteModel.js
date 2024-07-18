const mongoose = require('mongoose');

const NoteSchema = mongoose.Schema(
    {
        title: {type:String, required:true},
        body: {type:String, required:true},
        user: {type:String, required:true}
    },{
        versionKey: false
    }
);

const NoteModel = mongoose.model('note', NoteSchema);

module.exports = {
    NoteModel
}