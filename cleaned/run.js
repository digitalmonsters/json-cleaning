let jsonfile = require("./allfile.json")
const fs = require('fs');
let trks = [
    "NumPartitions",
    "EmailLinks",
    "KafkaNotificationsWriter",
    "ReplicationFactor",
    "Hosts",
    "MinBytes",
    "MaxBytes",
    "KafkaAuth",
    "Tls",
    "EventsFlushIntervalMs",
    "LimitPerUser",
    "MaxBackOffTimeMilliseconds",
    "BackOffTimeIntervalMilliseconds",
    "LikeCoefficient", "BulkVideoConfig",
    "FollowsKafka",
    "ApmConfig",
    "LikesKafka",
    "ContentKafkaWriter",
    "UserKafkaWriter",
    "ShareCoefficient",
    "CategoriesLimit",
    "HashtagsLimit",
    "WatchesLimit",
    "LikesLimit",
    "SharesLimit",
    "MessagesChunkLenWrite",
    "MessagesChunkLenRead",
    "RecommendationsOn",
    "SheetName",
    "Scylla",
    "MaxRetryCount",
    "FlushTimeMilliseconds",
    "FlushAtSize",
    "MaxBatchSize",
    "ListenerDuration",
    "PollTimeMs",
    "WorkerPoolSize",
    "LogLevel",
    "ServiceName",
    "ServerUrls",
    "ListenerDuration",
    "MaxPoolSize",
    "EventsFlushInterval",
    "MaxDuration",
    "MaxBatchSize", "SmsProviders", "SelectedSmsProvider", "EmailProviders",
    "PointsThresholdForUserWithoutKYC", "ExportRecordsPerIteration",
    "PointBaseRate",
    "TokenReserveSupply",
    "TokenTotalSupply",
    "PointToToken", "DeepLink",
]



let allOBJ = []
jsonfile.map(p => {
    let r = cleanobj(p)
    allOBJ.push(r)
})



function cleanobj(obj) {
    if (typeof obj == "object") {
        Object.keys(obj).map(e => {
            trks.map(j => delete obj[j])


            cleanobj(obj[e])
        })
    }
    return obj
}

let allfile = require("path").join(__dirname, `allfilenew.json`)
fs.writeFileSync(allfile, JSON.stringify(allOBJ, null, 4));