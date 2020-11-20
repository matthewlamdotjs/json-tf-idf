/**
 * Implementation of the TF-IDF ranked multi-keyword search algorithm
 * adapted from guenodz java snippet: https://gist.github.com/guenodz/d5add59b31114a3a3c66
 * by Matthew Lam
 * 
 * -simple ranked searching of an array of JSON objects
 * -considers single index on concatenation of all object keys mapping to type string
 *  (objects need not have matching keys, nor is there support to enforce it)
 * -uses a contains clause instead of equals to yield more results on smaller data sets
 * 
 * @param {String} query 
 * @param {Array<Object>} documents 
 */
const simpleSearch = (query, documents) => {

    // return empty if nothing to do
    if(typeof query != 'string' || documents.length == 0) return [];

    const NUM_DOCS = documents.length;

    // make copy and init
    let modifiedDocs = documents.map((document) => { 
        // init tdidf value
        document.tfidf = 0;
        // Create doc array from object properties
        let doc = [];
        Object.keys(document).forEach((key) => {
            let property = document[key];
            if(typeof property == 'string') doc = doc.concat(property.split(' '));
        });
        document.doc = doc;
        return document;
    });

    // iterate over terms in query
    query.split(' ').forEach((term) => {
        
        // total documents containing current term
        let idfTermCount = 0;

        // create tf values
        modifiedDocs.forEach((document) => {
            let add = false, result = 0;
            document.doc.forEach((word) => {
                if(word.toLowerCase().indexOf(term.toLowerCase()) > -1){
                    add = true;
                    result++;
                }
            });
            if(add) idfTermCount++;
            document.tf = result / NUM_DOCS;
        });

        // calculate idf
        let idf = Math.log(NUM_DOCS / idfTermCount);

        // apply tf * idf
        modifiedDocs = modifiedDocs.map((document) => {
            document.tfidf += (document.tf * idf); // add tfidf for this term
            return document;
        });
    });

    // return sorted by tfidf include only relevant
    return modifiedDocs
        .sort((a, b) => b.tfidf - a.tfidf)
        .filter((document) => document.tfidf > 0)
        .map((document) => {
            // clean it back up
            delete document.tf;
            delete document.tfidf;
            delete document.doc;
            return document;
        });
}
 
export default simpleSearch;