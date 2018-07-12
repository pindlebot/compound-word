const dictionary = require('./fixtures/dictionary.json')

const isUppercase = char =>
  char.charCodeAt(0) >= 65 && char.charCodeAt(0) <= 90

const stripTld = string => string.replace(/\.\w+$/, '')

const findWord = maybeWord => dictionary.find(([word, score]) => word === maybeWord)

const hasUppercase = chars =>
  chars.slice(1, chars.length).some(isUppercase)

const simpleSplit = (chars) => {
  let str = ''
  let out = []
  let index = 0

  const put = value => {
    out.push(value)
    str = ''
  }

  while (index < chars.length) {
    let char = chars[index]
    let next = chars[index + 1] || ''
    str += char.toLowerCase()
    index++
    if (isUppercase(next)) {
      put(str)
      continue
    }
    if (index === chars.length) {
      put(str)
    }
  }

  return out
}

const calculateScore = (modifier, head) => {
  let value = 0
  const score = word => {
    let entry = findWord(word)
    if (entry) {
      value += Math.log(entry[1])
    }
  }
  score(modifier)
  score(head)

  return value
}

const difficultSplit = (chars, { bias }) => {
  let str = ''
  let out = []
  let index = 0
  
  const put = value => {
    out.push(value)
    str = ''
  } 
  
  let options = []
  
  while (index < chars.length) {
    let char = chars[index]
    let next = chars[index + 1] || ''
    str += char.toLowerCase()
    index++
    if (str.length > 1 && index < chars.length - 2) {
      let head = chars.slice(str.length, chars.length).join('')
      let score = calculateScore(str, head)
      if (score > 0) {
        score = bias(str, head, score)
        options.push({ parts: [str, head], score })
      }
    }
  }
  options = options.sort((a, b) => b.score - a.score)
    .map(({ parts }) => parts)
  return options[0] || []
}

function bias (left, right, score) {
  return score - Math.abs(left.length - right.length)
}

function parse (string, options = {}) {
  options.bias = options.bias || bias
  let chars = stripTld(string).split('')
  let hasUppercase = chars.slice(1, chars.length).some(isUppercase)

  let result = chars.every(isUppercase)
    ? []
    : hasUppercase
      ? simpleSplit(chars)
      : difficultSplit(chars, options)
    
  return result
}
module.exports = parse
