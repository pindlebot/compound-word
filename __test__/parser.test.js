const parse = require('../src')

const input = {
  'oncobox': ['onco', 'box'],
  'facebook': ['face', 'book'],
  'mapquest': ['map', 'quest'],
  'sendgrid': ['send', 'grid'],
  'techcrunch': ['tech', 'crunch'],
  'paypal': ['pay', 'pal'],
  'mentalfloss': ['mental', 'floss'],
  'airtable': ['air', 'table'],
  'helpscout': ['help', 'scout'],
  'polymail': ['poly', 'mail'],
  'producthunt': ['product', 'hunt'],
  'cheatsheet': ['cheat', 'sheet'],
  'whatruns': ['what', 'runs'],
  'jamboard': ['jam', 'board'],
  'pixelsnap': ['pixel', 'snap'],
  'snapchat': ['snap', 'chat'],
  'basecamp': ['base', 'camp'],
  'warcraft': ['war', 'craft'],
  'slipknot': ['slip', 'knot'],
  'moonlight': ['moon', 'light'],
  'crosswalk': ['cross', 'walk'],
  'backbone': ['back', 'bone']
}

let output = parse(Object.keys(input))

output.forEach(({ result, string }) => {
  // it(`${string}`, () => {
  //  expect(result).toMatchObject(input[string])
  // })
})

const compounds = require('./compounds.json')

compounds.forEach(entry => {
  let { firstWord, secondWord, compoundWord } = entry

  it(compoundWord, () => {
    let arr = [firstWord, secondWord]
    expect(parse([compoundWord])[0].result).toMatchObject(arr)
  })
})