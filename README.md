# json-tf-idf
ultra lightweight NodeJs multi-keyword ranked search function for array of json objects

## keys / indices
There is no keyed index configuration for the search, nor do the keys of each object within the input array have to match. The "document" in the tf-idf algorithm is essentially the concatenation of all of the object properties of type string.

## usage
```javascript
import simpleSearch from 'json-tf-idf';

let data = [
  // note object keys need not match, it will treat all string properties as the "document" in tf-idf
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

let query = 'code line'

console.log(simpleSearch(query, data));
// OUTPUT >>>
//[
//  {
//    username: 'Jeff',
//   address: '123 sesame street',
//    notes: 'coded 200 lines of code today'
//  },
//  {
//    name: 'Matt',
//    description: 'I wrote code yesterday',
//  }
//]
```
