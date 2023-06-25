const fs = require('fs');
let allOBJ = []

let normalizedPath = require("path").join(__dirname);
require("fs").readdirSync(normalizedPath).forEach(function (file) {
    let ext = file.substring(file.lastIndexOf('.') + 1, file.length) || file;
    let verb = file.substring(0, file.lastIndexOf('.'));
    if (ext == "json" && verb.indexOf("package") < 0) {
        console.log("file --> ", file);

        cleanFile(require(require("path").join(__dirname, file)), verb)
    }
});


function cleanFile(obj, fnm) {
    let trash = ["PrivateHttpPort", "SoundStripe", "S3", "QrConfig", "KafkaWriterConfig", "OnlineTimeoutMs", "KafkaWriter", "MigrationEnv",
        "HttpPort", "HttpDeepLinkPort", "MaxThresholdHours", "Firebase", "WorkerPoolSize", "MaxStmtsPerBatch", "ContentWrapper",
        "MasterDb", "CategoryTopUserGenerator",
        "ReadonlyDb", "SolanaConfig", "EvmConfig", "TapjoyConfig", "Applovin", "Ironsource", "Kyc", "GoHighLevel", "ExportRecordsPerIteration", "DeepLinkConfig",
        "Scylla", "ZammadConfig",
        "Db", "CdcKafka", "MinContentDuration", "MaxPoolSize",
        "Redis", "Jobber", "MobileConfig", "PermissionsTable", "AppleConfig", "GeolocationApiUrl", "PreviewConfig", "DeeplinkConfig",
        "Elastic",
        "Wrappers",
        "GoogleConfig", "CdnBase"]
    let trashkeys = ["url", "scylla", "db", "s3", "feedgenerator", "redis"]


    trashfromconfig = ["WorkerPoolSize", "PollTimeMs", "MaxDuration", "MaxBatchSize", "Tls", "FlushAtSize", "Hosts", "MinBytes", "MaxBytes", "NumPartitions",
        "ReplicationFactor", "MaxRetryCount", "FlushTimeMilliseconds"]

    trash.map(t => {
        delete obj[t]
    })


    function funcClean(obj) {

        Object.keys(obj).map(t => {
            trashkeys.map(tk => {
                if (t.toLocaleLowerCase().indexOf(tk) >= 0) {
                    delete obj[t]
                }
            })
            // if(typeof obj[t] == "object") {
            //     // funcClean(obj[t])
            //     console.log("object", t);
            // }
        })

    }
    funcClean(obj)

    Object.keys(obj).map(e => {
        trashfromconfig.map(p => {
            delete obj[e][p]

        })
    })

    allOBJ.push({["repo-name"] : fnm, ...obj});
    // Object.keys(obj).map(e => {
        // let dir = require("path").join(__dirname, "cleaned", fnm)
        // if (!fs.existsSync(dir)) {
        //     fs.mkdirSync(dir);
        // }

        // let newfile = require("path").join(dir, `${e}.json`)
        // fs.writeFileSync(newfile, JSON.stringify(obj[e], null, 4));
        // console.log("e------", newfile);
    // })




    let newfile = require("path").join(__dirname, "cleaned", `${fnm}-cleaned.json`)
    fs.writeFileSync(newfile, JSON.stringify(obj, null, 4));
    
    // console.log(obj);
}
let allfile = require("path").join(__dirname, "cleaned", `allfile.json`)
fs.writeFileSync(allfile, JSON.stringify(allOBJ, null, 4));