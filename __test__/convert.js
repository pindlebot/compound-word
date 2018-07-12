const fs = require('fs-extra')
const path = require('path')

function save (data) {
  return fs.writeJson(path.join(__dirname, 'common.json'), data)
}

async function convert () {
  let raw = await fs.readFile(path.join(__dirname, 'text.txt'), { encoding: 'utf8' })
     
  data = raw.split(/\r?\n/g)
    .map(row => {
      let [word, count] = row.split(/\s+/)
      return [word, parseInt(count)]
    })
    .filter(([word, count]) => {
      return word.length > 1
    })

  await save(data)
}

convert()