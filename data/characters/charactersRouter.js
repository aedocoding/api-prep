const express = require("express");
const charactersModel = require("../helpers/charactersModel");

const router = express.Router();

router.get("/", (req, res) => {
    charactersModel
    .get(req.id)
    .then ( e => {
        res.status(200).json(e)
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({message: "Error retrieving characters"})
    })
})

router.post("/", (req, res)=>{
    const characterInfo = req.body
    charactersModel
        .insert(characterInfo)
        .then(() => {
            res.status(201).json({message: "Character was created"})
        })
        .catch(error => {
            res.status(500).json({ error, error: "There was an error creating a new character"})
        })
})
router.put("/:id", (req, res) => {
    const characterInfo = req.body;
    const {id} = req.params
    charactersModel
        .update(id, characterInfo)
        .then(e => {
            if (e) {
                res.status(200).json({ message: "The character has been updated"})
            }   else {
                res.status(404).json({ message: "The character could not be updated"})
            }
        })
        .catch(error => {
            res
                .status(500)
                .json({ error: "There was an error updating the character"})
        })

})

router.delete("/:id", (req, res) => {
    //can shorten req.params.id by just using {id} = req.params.id
    charactersModel
        .remove(req.params.id)
        .then(e => {
            if (e > 0){
                res.status(200).json({ message: "The character has been deleted"})
            } else {
                res.status(404).json({ message: "The character could not be found"})
            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ message: "Error deleting the character"})
        })
})

module.exports =router;