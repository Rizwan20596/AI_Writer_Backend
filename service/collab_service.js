var Documents = require('../model/databaseModel')


const GetData = async (documentName) => {
    let doc = await Documents?.findOne({name: documentName});
    return doc;
}

const UpdateData = async (id, data) => {
    Documents.findByIdAndUpdate(data.id, { "data": data });
}

const InsertData = async (documentName, data) => {
    const doc = new Documents({"name": documentName, "data": data})
    doc.save();
}

module.exports = {GetData, UpdateData, InsertData}