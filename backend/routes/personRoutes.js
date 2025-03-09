const express = require("express");
const router = express.Router();
const Person = require("../models/Person");

// GET all people
router.get("/", async (req, res) => {
  const people = await Person.find();
  res.json(people);
});

// POST a new person
router.post("/", async (req, res) => {
  const newPerson = new Person(req.body);
  await newPerson.save();
  res.json({ message: "Person Added", person: newPerson });
});

// PUT (Update) a person
router.put("/:id", async (req, res) => {
  const updatedPerson = await Person.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json({ message: "Person Updated", person: updatedPerson });
});

// DELETE a person
router.delete("/:id", async (req, res) => {
  await Person.findByIdAndDelete(req.params.id);
  res.json({ message: "Person Deleted" });
});

module.exports = router;
