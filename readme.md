## compound-word

Split a compound word into parts. Uses the 0.3 million most common words.  

```js
const parse = require('compound-word')

let parts = parse('facebook') 
// => ['face', 'book']

parse('underworld')
// => ['under', 'world']
```