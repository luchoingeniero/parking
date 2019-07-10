const express=require('express');
const router=express.Router();
const usersController=require('../controllers/users');

router.route('/')
    .get(usersController.listAll)
    .post(usersController.add)
    .put(usersController.update);

router.route('/:id')
      .delete(usersController.delete)
      .get(usersController.findById);

module.exports=router;