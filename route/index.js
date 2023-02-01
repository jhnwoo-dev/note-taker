const express = require("express");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

const router = express.Router();

router.get("/notes", (req, res) => {
    fs.readFile(__dirname + "/../db/db.json", function (error, data) {
        if (error) {
            res.send(error);
        } else {
            const notes = JSON.parse(data);
            res.json(notes);
        }
    });
});

router.post("/notes", (req, res) => {
    const aNote = {
        id: uuidv4(),
        title: req.body.title,
        text: req.body.text,
    };
    fs.readFile(__dirname + "/../db/db.json", function (error, data) {
        if (error) {
            res.send(error);
        } else {
            const notes = JSON.parse(data);
            notes.push(aNote);
            fs.writeFile(
                __dirname + "/../db/db.json",
                JSON.stringify(notes, null, 4),
                function (error) {
                    if (error) {
                        res.send(error);
                    } else {
                        res.json(aNote);
                    }
                }
            );
        }
    });
});

router.delete("/notes/:id", (req, res) => {
    const id = req.params.id;
    fs.readFile(__dirname + "/../db/db.json", function (error, data) {
        if (error) {
            return res.send(error);
        }
        let notes = JSON.parse(data);
        notes = notes.filter((note) => note.id !== id);
        fs.writeFile(
            __dirname + "/../db/db.json",
            JSON.stringify(notes, null, 4),
            function (error) {
                if (error) {
                    res.send(error);
                } else {
                    res.send("Your note has been deleted.");
                }
            }
        );
    });
});

module.exports = router;
