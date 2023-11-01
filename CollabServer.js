const { Hocuspocus } = require("@hocuspocus/server");
const { Database } = require("@hocuspocus/extension-database");
const sqlite3 = require('sqlite3');
let db = new sqlite3.Database('./config/sample.db');
var connectDB = require('./config/db');
const { GetData, InsertData, UpdateData } = require("./service/collab_service");

//     var dbo = db.db("mydb");
//     var myobj = { name: "Company Inc", address: "Highway 37" };
//     dbo.collection("customers").insertOne(myobj, function(err, res) {
//       if (err) throw err;
//       console.log("1 document inserted");
//       db.close();
//     });
//   });

const dataHandler = new Database({
    //To get the data
    fetch: async ({ documentName }) => {
        // return new Promise(async (resolve, reject) => {
            let doc = await GetData(documentName);
            if(doc) {
                // console.log(doc.data)
                return doc.data;
            } else {
                return;
            }
            // },() =>{ console.log('connected')});

            //     db?.get(
            //         `
            //     SELECT data FROM "documents" WHERE id = $name ORDER BY rowid DESC
            //   `,
            //         {
            //             $name: documentName,
            //         },
            //         (error, row) => {
            //             if (error) {
            //                 console.log("error",error)
            //                 return reject(error);
            //             }
            //             if(row?.data) {
            //                 return resolve(row?.data);
            //             } else {
            //                 db?.run(
            //                     `
            //                   INSERT INTO "documents" VALUES($name,$data)
            //                 `,
            //                     {
            //                         $name: documentName,
            //                         $data: '',
            //                     },
            //                     (error, row) => {
            //                         if (error) {
            //                             console.log("error",error)
            //                             reject(error);
            //                         }
            //                         return resolve(row?.data);
            //                     }
            //                 );

            //             }
            //         }
        //     //     );
        // });
    },
    // … and a Promise to store data:
    store: async ({ documentName, state }) => {
        // let database = mongoose.connection.collection('documents');
        let data = await GetData(documentName);
        // console.log("Dsadas", data, database.collectionName);
        if(!data) {
            console.log("create", state);
            await InsertData(documentName, state);
        } else {
            console.log("update", state)
            await UpdateData(data.id, state);
            // data.set({"data": state});

            // Documents.findOneAndUpdate({ name: documentName }, { "$set": { "data": state } })
            // doc.save();
        }
        // if (data) {
        //     data.updateOne({ data: data });
        // } else {
        //     data.insertOne({ id: documentName, data: data });
        // }
        // db?.run(
        //     `
        //   UPDATE "documents" set "data"=$data where "id" = $name
        // `,
        //     {
        //         $name: documentName,
        //         $data: state,
        //     }
        // );
    },
})
//Workassist code
//     fetch: async ({ documentName: sessionId }) => {
//         let resp = await sessionModel.getSession(sessionId);
//         // console.log(' ============ dataHandler fetch === ', sessionId, resp);
//         return resp?.data;
//         // return Buffer.from(resp?.data, 'base64');
//     },
//     //to push the data
//     store: async ({ documentName: sessionId, state }) => {
//         // console.log(' ============ dataHandler store', sessionId, typeof state);
//         let val = state; //.toString('base64');
//         return await sessionModel.insertOrUpdateSession(sessionId, { data: val });
//     }
// })

const authenticationHandler = async function (sessionId, token) {
    // console.log(' ============ authenticateHandler', arguments);
    return { user: { "id": "aaa", name: "AAA" } };
}
const server = new Hocuspocus({
    name: "collabserver-01",
    timeout: 30000,
    debounce: 5000,
    maxDebounce: 30000,
    quiet: false,
    port: 6234,
    onConnect: async function () {
        // console.log(" ========= connections: ===================== ", server.getConnectionsCount());
    },
    connected: async function () {
        // console.log("connections: ===================== ", server.getConnectionsCount());
    },
    onAuthenticate: authenticationHandler,
    extensions: [
        dataHandler,
    ]
});
const initiateConnection = async () => {
    await connectDB();
    server.listen();
}
initiateConnection();
