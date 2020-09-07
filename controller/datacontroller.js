const fs =require('fs')

const country = (req, res) =>{   
    fs.readFile('asset/countries.json', (err, data) => {
        if (err) throw err;
        let countries = JSON.parse(data);
        res.send(countries);
    });
}

exports.country = country;