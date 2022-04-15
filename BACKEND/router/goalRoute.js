const express = require('express');
const router = express.Router();

const {
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal
} = require('../controller/goalController');
const { protect } = require('../middleware/authMiddleware')


//all routers
//protecting all router
router.get('/', protect, getGoals)

router.post('/', protect, setGoal)

router.put('/:id', protect, updateGoal)

router.delete('/:id', protect, deleteGoal)


module.exports = router;
