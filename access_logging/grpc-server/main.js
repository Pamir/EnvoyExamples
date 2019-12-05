const grpc = require('grpc')
const alsMessages = require('./static_codegen/envoy/service/accesslog/v2/als_pb')
const alsService = require('./static_codegen/envoy/service/accesslog/v2/als_grpc_pb')

function streamAccessLogs(call) {
    console.log('Here')
    call.on('data', (data) => {
        console.log(data.request)
    })

    call.on('end', () => {
        call.end()
    })
}

function main() {
    const server = new grpc.Server()
    server.addService(alsService.AccessLogServiceService, { 
        streamAccessLogs: streamAccessLogs 
    })
    server.bind('0.0.0.0:50051', grpc.ServerCredentials.createInsecure())
    console.log('Starting Server')
    server.start()
}

main()

