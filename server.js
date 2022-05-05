const http = require('http')

const args = require('minimist')(process.argv.slice(2))

args['port']

const port = args.port || process.env.port || 5000

const express = require('express')

const app = express()


//a02 functions 

function coinFlip() {
    let num = Math.random()
    if(num > 0.50){
      return "heads"
    }
    return "tails"
}

function coinFlips(flips) {
    let result = [] 
    for(let i = 0; i < flips; i++){
      let num = Math.random()
      if(num > 0.50){
        result[i] = "heads"
  
      } else {
        result[i] = "tails"
      }
    }
    return result
}

function countFlips(array) {
    let count = {heads: 0, tails: 0}
    for(let i =0; i < array.length; i++){
      if(array[i] == "heads"){
        count.heads += 1
      } else {
        count.tails += 1
      }
    }
    return count
}

function flipACoin(call) {
    let toss = coinFlip()
    let outcome = ""
    if(toss == call){
      outcome = "win"
    } else {
      outcome = "lose"
    }
    return {call: call, flip: toss, result: outcome}
}

//a02 functions end

//app endpoints start

app.get('/app/flip/call/tails', (req, res) => {
    const resultFlip = flipACoin('tails')
    res.status(200).json({ 'call' : resultFlip.call, 'flip': resultFlip.flip, 'result': resultFlip.result})
})

app.get('/app/flip/call/heads', (req, res) => {
    const resultFlip = flipACoin('heads')
    res.status(200).json({ 'call' : resultFlip.call, 'flip': resultFlip.flip, 'result': resultFlip.result})
})

app.get('/app/flips/:number', (req, res)=> {
    const resultFlips = coinFlips(req.params.number)
    res.status(200).json( {'raw' : resultFlips, 'summary' : countFlips(resultFlips)})
})

app.get('/app/flip/', (req, res) => {
    res.status(200).json({'flip': coinFlip()})
})

app.get('/app/', (req, res) => {
    res.statusCode = 200
    res.statusMessage = 'OK';
    res.writeHead( res.statusCode, { 'Content-Type' : 'text/plain' });
    res.end(res.statusCode+ ' ' +res.statusMessage)
})

app.use(function(req, res) {
    res.status(404).send('404 NOT FOUND')
})

//app listening
app.listen(port, () => {
    console.log('App listening on port %PORT%'.replace('%PORT%', port))
})

