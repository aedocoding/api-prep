const express = require("express");
const showsModel = require("../helpers/showsModel");

const router = express.Router();

router.get("/", (req, res) => {
    showsModel
    .get(req.id)
    .then ( e => {
        res.status(200).json(e)
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({message: "Error retrieving shows"})
    })
})
router.get("/:id/characters", (req, res) => {
    showsModel
    .getShowsCharacters(req.params.id)
    .then ( e => {
        res.status(200).json(e)
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({message: "Error retrieving characters"})
    })
})

router.post("/", (req, res)=>{
    const showInfo = req.body
    showsModel
        .insert(showInfo)
        .then(() => {
            res.status(201).json({message: "Show was created"})
        })
        .catch(error => {
            res.status(500).json({ error, error: "There was an error creating a new show"})
        })
})
router.put("/:id", (req, res) => {
    const showInfo = req.body;
    const {id} = req.params
    showsModel
        .update(id, showInfo)
        .then(e => {
            if (e) {
                res.status(200).json({ message: "The show has been updated"})
            }   else {
                res.status(404).json({ message: "The show could not be updated"})
            }
        })
        .catch(error => {
            res
                .status(500)
                .json({ error: "There was an error updating the show"})
        })

})
// router.put('/:id', (req, res) => {
// 	console.log(req.body);
// 	const { id } = req.params;
// 	const body = req.body;
// 	Shows.update(id, body)
// 		.then(() => {
// 			res.status(200).json({ message: 'show was updated' });
// 		})
// 		.catch(err => {
// 			console.log(err);
// 			res.status(500).json({ errorMessage: 'show update error' });
// 		});
// });
router.delete("/:id", (req, res) => {
    //can shorten req.params.id by just using {id} = req.params.id
    showsModel
        .remove(req.params.id)
        .then(e => {
            if (e > 0){
                res.status(200).json({ message: "The show has been deleted"})
            } else {
                res.status(404).json({ message: "The show could not be found"})
            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ message: "Error deleting the show"})
        })
})
// router.delete('/:id', (req, res) => {
// 	const { id } = req.params;
// 	Shows.remove(id)
// 		.then(() => {
// 			res.status(200).json({ message: 'show was deleted' });
// 		})
// 		.catch(err => {
// 			console.log(err);
// 			res.status(500).json({ errorMessage: 'show not deleted' });
// 		});
// });
module.exports =router;