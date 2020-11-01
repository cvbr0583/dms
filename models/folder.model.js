const mongoose = require('mongoose');

const FolderSchema = new mongoose.Schema({
    /* Folder Name */
    folderName: {
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