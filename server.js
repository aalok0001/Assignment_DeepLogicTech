const http = require('http');
const fetchData = require('./fetchData');
const { extractStoriesSection, parseStories } = require('./parseStories');

const server = http.createServer((req, res) => {

    if (req.url === '/getTimeStories') {

        fetchData('https://time.com/', (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end("Error: " + err.message);
                return;
            }

            try {
                const storiesSection = extractStoriesSection(data);
                const stories = parseStories(storiesSection);
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(stories, null, 2));
            } 
            
            catch (error) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end("Parsing error: " + error.message);
            }

        });

    } 
    
    else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end("Not Found");
    }

});

server.listen(3000, () => {
    console.log('Server is hosted on port 3000, just copy this link "http://localhost:3000/getTimeStories"');
});
