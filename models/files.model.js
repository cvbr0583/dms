const mongoose = require('mongoose');

const FolderSchema = new mongoose.Schema({
    /* content of the file */
    content: {
        type: String,
        required: true,
        unique: true
    },
    /* Owner of the record and saving user object */
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    /*Folder reference and saving user folder */
    folderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Folder',
        required: true
    },
    /* record created date */
    createdAt: {
        type: Date,
        default: Date.now
    },
    /* record updated date */
    updatedAt: {
        type: Date,
        default: Date.now
    }
}, {
    versionKey: false
});

module.exports = mongoose.model('Folder', FolderSchema);