const csv = require('csv-parser')
const fs = require('fs')

fs.exists('canada.txt', (flag) => {
    if(flag){
        fs.unlinkSync('canada.txt')
        console.log('file delete success')
    } else {
        console.log('No file to delete')
    }
})

fs.exists('usa.txt', (flag) => {
    if(flag){
        fs.unlinkSync('usa.txt')
        console.log('file delete success')
    } else {
        console.log('No file to delete')
    }
})

let results = [];

fs.createReadStream("input_countries.csv")
    .pipe(csv())
    .on("data", (data) => results.push(data))
    .on("end", () => {
        console.log(results)
        canadaFilter = results.filter( element => element.country =="Canada")
        usaFilter = results.filter( element => element.country =="United States")
        fs.writeFile("canada.txt", JSON.stringify(canadaFilter), (err) => err && console.error(err))
        fs.writeFile("usa.txt", JSON.stringify(usaFilter), (err) => err && console.error(err))
    })