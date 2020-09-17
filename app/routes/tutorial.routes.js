module.exports = app => {
  const tutorials = require("../controllers/tutorial.controller.js");

  // Create a new tutorial
  app.post("/tutorials", tutorials.create);

  // Retrieve all tutorials
  app.get("/tutorials", tutorials.findAll);

  // Retrieve a single tutorial with tutorialId
  app.get("/tutorials/:tutorialId", tutorials.findOne);

  // Update a tutorial with tutorialId
  app.put("/tutorials/:tutorialId", tutorials.update);

  // Delete a tutorial with tutorialId
  app.delete("/tutorials/:tutorialId", tutorials.delete);

  // DeleteAll tutorial
  app.delete("/tutorials", tutorials.deleteAll);
};
