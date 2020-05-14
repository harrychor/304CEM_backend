/*
const igdb = require('igdb-api-node');
const client = igdb('2c89f79974756e802ed385239638b5a2');
const response = client()
    .fields(['name', 'movies', 'age']) // fetches only the name, movies, and age fields
    .fields('name,movies,age') // same as above

    .limit(50) // limit to 50 results
    .offset(10) // offset results by 10

    .sort('name') // default sort direction is 'asc' (ascending)
    .sort('name', 'desc') // sorts by name, descending
    .search('mario') // search for a specific name (search implementations can vary)

    .where(`first_release_date > ${new Date().getTime() / 1000}`) // filter the results

    .request('/games'); // execute the query and return a response object

console.log(response.data);
*/