const axios = require('axios')
const nameData = require('./store')

// Function to find list of the countries
exports.getCountries = async (req,res)=> {
    try {
        let result = await axios.get('https://restcountries.com/v3.1/all')

        let finalResult = result.data.map((val) => {
            return {Countryname: val.name.common,currencies:val.currencies}
        })
        console.log(finalResult)
        res.status(200).send({status:"ok", data: finalResult})
    } catch (error) {
        console.log(error)
    }
    
}

// Function to find the names of specific patter
exports.searchName = async (req,res) => {
    try {
        let nameRegex = /^[A-Za-z]+$/;
        let input = req.query.input;

        if(!input.match(nameRegex)){
            res.status(400).send({error:"please give only albhabet in request query"})
        }
        let result = nameData.nameData.filter(val => {
            return val.toLowerCase().startsWith(input.toLowerCase())
        })
        console.log("result", result)
        res.status(200).send({status:"ok", data: result})
    } catch (error) {
        console.log('error', error)

    }
}