const database = require('./db.json')
let newID = 4

module.exports = {
    getHouses: (req,res) =>{
        res.status(200).send(database)
    },

    deleteHouse: (req,res) => {
        let { id } = req.params
        let index = database.findIndex(houseObj => houseObj.id === +id)
        database.splice(index,1)
        res.status(200).send(database)
    },

    createHouse: (req,res) => {
        let { address, price, imageURL } = req.body
        let newHouse = {
            id: newID, 
            address: address,
            price: price,
            imageUrl: imageURL
        } 
        database.push(newHouse)
        res.status(200).send(database)
        newID++
    },

    updateHouse: (req,res) => {
        let { id } = req.params
        let { type } = req.body
        let index = database.findIndex(houseObj => houseObj.id === +id)
        let houseToUpdate = database[index]
        if(type === 'minus' && houseToUpdate.price > 10000){
            houseToUpdate.price-=10000
        }else if (type === 'plus' && houseToUpdate.price){
            houseToUpdate.price+=10000
        }
        res.status(200).send(database)
    }

}