# json-tf-idf
An ultra lightweight NodeJS multi-keyword ranked search function for array of json objects

## keys / indices
The "document" in the tf-idf algorithm is essentially the concatenation of all of the object properties of type string. There is no support for an include / exclude list of keys.

## stopwords
Stopwords are removed from each query using the stopword.removeStopwords() function from the npm package "stopword".

## installation
```bash
npm i @matthewlam.js/json-tf-idf
```

## dependencies
- <a href="https://www.npmjs.com/package/stopword">stopword</a>

## usage
```javascript
const simpleSearch = require('@matthewlam.js/json-tf-idf');

let data = [
  // note object keys need not match,
  // it will treat all string properties as the "document" in tf-idf
  {
    message: 'Why did the chicken cross the road?'
  },
  {
    name: 'Matt',
    description: 'I wrote code yesterday',
  },
  {
    username: 'Jeff',
    address: '123 sesame street',
    notes: 'coded 200 lines of code today'
  }
]

let query = 'code the line'

console.log(simpleSearch(query, data));
// OUTPUT:
// [
//   {
//     username: 'Jeff',
//     address: '123 sesame street',
//     notes: 'coded 200 lines of code today'
//   },
//   {
//     name: 'Matt',
//     description: 'I wrote code yesterday',
//   }
// ]
```
