// import express
const express = require('express')
const fs = require('fs')
// create an express router
const router = express.Router()


// PC INDEX ROUTE
router.get('/', (req, res) => {
    let creatures = fs.readFileSync('./prehistoric-creatures.json')
    let creatureData = JSON.parse(creatures)
    
    let nameFilter = req.query.nameFilter
    if(nameFilter){
        creatureData = creatureData.filter(creature => (creature.name.toLowerCase() === nameFilter.toLowerCase()))
    }

    res.render('prehistoric-creatures/index.ejs', {myCreatures: creatureData})
})

// NEW CREATURE FORM ROUTE
router.get('/new', (req, res) => {
    res.render('prehistoric-creatures/new.ejs')
})

// PC SHOW ROUTE (a specific creature)
router.get('/:id', (req, res) => {
    // get the array of creatures from the json
    let creatures = fs.readFileSync('./prehistoric-creatures.json')
    let creatureData = JSON.parse(creatures)
    // identify the index of the creature in question
    let creatureIndex = req.params.id
    // console.log(`The creature you\'re searching for is ${creatureIndex}`)
    // isolate the creature in question
    // console.log(creatureData[creatureIndex])
    res.render('prehistoric-creatures/show.ejs', {creature:creatureData[creatureIndex]})
})

// POST A NEW CREATURE ROUTE
router.post('/', (req, res) => {
    // get the array of creatures from the json
    let creatures = fs.readFileSync('./prehistoric-creatures.json')
    let creatureData = JSON.parse(creatures)
    // add the new creature to the array
    creatureData.push(req.body)
    // save the creatures to the json
    fs.writeFileSync('./prehistoric-creatures.json', JSON.stringify(creatureData))
    // redirect to the index route
    res.redirect('/prehistoric_creatures')
    console.log(req.body)
})
// GET /creatures/edit/:id -- a view of a form to edit a specific creature @ :id
router.get('/edit/:id', (req, res)=> {
    // get the creature data & render the edit form
    let creatures = fs.readFileSync('./prehistoric-creatures.json')
    let creatureData = JSON.parse(creatures)
    // render edit form
    res.render('prehistoric-creatures/edit.ejs', {
        creatureId: req.params.id,
        creature: creatureData[req.params.id]
    })
    // res.send(`show an edit form for a creature @ ${req.params.id}`)
})
// PUT /prehistoric-creatures/:id -- update a creature @ :id in the database
router.put('/:id', (req, res) => {
    // get the creates from the creature.json
    let creatures = fs.readFileSync('./prehistoric-creatures.json')
    let creatureData = JSON.parse(creatures)
    console.log(req.params.id, req.body)
    // update the creature based on the req.params.id & the req.body
    // req.params = which creature 
    // req.body = creature data to update
    creatureData[req.params.id].name = req.body.name
    creatureData[req.params.id].type = req.body.type
    // write the json file
    fs.writeFileSync('./prehistoric-creatures.json', JSON.stringify(creatureData))
    // redirect to someplace that has interesting data
    res.redirect('/prehistoric_creatures') //--go back to all creatures
    // res.redirect(`/prehistoric_creatures/${req.params.id}`) //just see this one creature
    // res.send(`update a creature @ ${req.params.id}`)
})
// DELETE /prehistoric_creatures/:id -- DESTROY a creature @ :id
router.delete('/:id', (req, res) => {
    // get the creatures from the creature json
    let creatures = fs.readFileSync('./prehistoric-creatures.json')
    let creatureData = JSON.parse(creatures)
    // splice creature out of the array (index from the req.params)
    // Array.splice(starting index to remove, how many elements to remove)
    creatureData.splice(req.params.id, 1)
    // save the creature json
    fs.writeFileSync('./prehistoric-creatures.json', JSON.stringify(creatureData))
    // redirect to see all remaining creatures
    // res.send(`DESTROY a poor creature @ ${req.params.id}`)
    res.redirect('/prehistoric_creatures')
})
module.exports =router