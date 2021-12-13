const express = require('express');
const router = express.Router();

// require the Drone model here
const Drone = require('../models/Drone.model');

router.get('/drones', (req, res, next) => {
  // Iteration #2: List the drones
  // ... your code here
  Drone.find({})
  .then ((drones)=>{
    res.render('drones/list', {drones: drones})
  })
  .catch(error => next(error));
});

router.get('/drones/create', (req, res, next) => {
  // Iteration #3: Add a new drone
  // ... your code here
  Drone.create()
  .then ((drone)=>{
    res.render('drones/create-form', {drone})
  })
  .catch(error => next(error));
});

router.post('/drones/create', (req, res, next) => {
  // Iteration #3: Add a new drone
  // ... your code here
  const {name, propellers, maxSpeed} = req.body;
  Drone.create({name, propellers, maxSpeed})
  .then (()=>{
    res.redirect('/drones')
  })
  .catch(error => next(error));
});

router.get('/drones/:id/edit', (req, res, next) => {
  // Iteration #4: Update the drone
  // ... your code here
  const {id} = req.params;
  Drone.findById(id)
  .then((id)=>{
    res.render('drones/update-form', {drone:id})
  })
  .catch(error => next(error));
});

router.post('/drones/:id/edit', (req, res, next) => {
  // Iteration #4: Update the drone
  // ... your code here
  const {id} = req.params;
  const {name, propellers, maxSpeed} = req.body;
  Drone.findByIdAndUpdate(id, {name, propellers, maxSpeed}, {new: true})
  .then(() =>{
    res.redirect(`/drones`)
  })
  .catch(error => next(error));
});

router.post('/drones/:id/delete', (req, res, next) => {
  // Iteration #5: Delete the drone
  // ... your code here
  const {id} = req.params;
  Drone.findByIdAndDelete(id)
  .then(()=>{
    res.redirect('/drones')
  })
  .catch(error => next(error));
});

module.exports = router;
