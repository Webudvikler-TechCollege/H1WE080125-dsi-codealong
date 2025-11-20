import http from 'http'

http.createServer((request, response) => {
    response.writeHead(200, { 'Content-type': 'text/plain' })
    response.end('Hej webudviklere')
    console.log('Server responed with Hello world');    
}).listen(4000, () => {
    console.log('Server is running on http://localhost:4000');
})