const Tutorial = require("../models/tutorial.model.js");

// Create and Save a new Tutorial
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Tutorial
  const tutorial = new Tutorial({
    title: req.body.title,
    description: req.body.description,
    published: req.body.published
  });

  // Save Tutorial in the database
  Tutorial.create(tutorial, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutorial."
      });
    else res.send(data);
  });
};

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {

  /*
  //leggere un parametro dalla querystring??? GET ://localhost:8080/tutorials?title=cu
  const url = require('url');
  const querystring = require('querystring');
  let rawUrl = 'https://stackabuse.com/?page=2&limit=3';
  let parsedUrl = url.parse(rawUrl);
  let parsedQs = querystring.parse(parsedUrl.query);
  */
  

  //leggere un parametro dalla querystring??? GET ://localhost:8080/tutorials?title=cu
  console.log("req.originalUrl = ", req.originalUrl);// /tutorials?title=cu
  const url = require('url');
  const querystring = require('querystring');
  let parsedUrl = url.parse(req.originalUrl);
  let parsedQs = querystring.parse(parsedUrl.query);
  let title = parsedQs.title;
  console.log("title = ", title);//

  Tutorial.getAll(parsedQs.title, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    else res.send(data);
  });
};

// Find a single Tutorial with a tutorialId
exports.findOne = (req, res) => {
  Tutorial.findById(req.params.tutorialId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Tutorial with id ${req.params.tutorialId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Tutorial with id " + req.params.tutorialId
        });
      }
    } else res.send(data);
  });
};

// Update a Tutorial identified by the tutorialId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  Tutorial.updateById(
    req.params.tutorialId,
    new Tutorial(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Tutorial with id ${req.params.tutorialId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Tutorial with id " + req.params.tutorialId
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Tutorial with the specified tutorialId in the request
exports.delete = (req, res) => {
  Tutorial.remove(req.params.tutorialId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Tutorial with id ${req.params.tutorialId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Tutorial with id " + req.params.tutorialId
        });
      }
    } else res.send({ message: `Tutorial was deleted successfully!` });
  });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
  Tutorial.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all tutorials."
      });
    else res.send({ message: `All Tutorials were deleted successfully!` });
  });
};
