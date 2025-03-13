const express = require("express");
const router = express.Router();
const Person = require("../models/person");

// GET all people
router.get("/", async (req, res) => {
  try {
    const people = await Person.find();
    res.json(people);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET a single person by ID
router.get("/:id", async (req, res) => {
  try {
    const person = await Person.findById(req.params.id);
    if (!person) {
      return res.status(404).json({ message: "Person Not Found" });
    }
    res.json(person);
  } catch (err) {
    res.status(500).json({ error: "Invalid ID format or person not found", details: err.message });
  }
});

// POST a new person
router.post("/", async (req, res) => {
  try {
    const { name, age } = req.body;
    
    // Check if required fields exist
    if (!name || !age) {
      return res.status(400).json({ error: "Name and age are required!" });
    }

    // Insert new person into MongoDB
    const newPerson = new Person({ name, age });
    await newPerson.save();

    res.status(201).json({ message: "Person Added Successfully", person: newPerson });
  } catch (err) {
    res.status(400).json({ error: "Error adding person", details: err.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { name, age } = req.body;
    if (!name || !age) {
      return res.status(400).json({ error: "Name and age are required!" });
    }

    const updatedPerson = await Person.findByIdAndUpdate(
      req.params.id,
      { name, age },
      { new: true, runValidators: true }
    );

    if (!updatedPerson) {
      return res.status(404).json({ message: "Person Not Found" });
    }

    res.json({ message: "Person Updated Successfully", person: updatedPerson });
  } catch (err) {
    res.status(400).json({ error: "Error updating person", details: err.message });
  }
});

// DELETE a person
router.delete("/:id", async (req, res) => {
  try {
    const deletedPerson = await Person.findByIdAndDelete(req.params.id);
    if (!deletedPerson) {
      return res.status(404).json({ message: "Person Not Found" });
    }
    res.json({ message: "Person Deleted Successfully" });
  } catch (err) {
    res.status(500).json({ error: "Error deleting person", details: err.message });
  }
});

module.exports = router;
