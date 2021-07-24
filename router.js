const router = require('express').Router();

// const moviesRouter = require('./routes/moviesRouter.js');
// const seriesRouter = require('./routes/seriesRouter.js');
// const orderRouter = require('./routes/orderRouter.js');
const userRouter = require('./routes/userRouter.js');
const loginRouter = require('./routes/loginRouter.js');

// router.use('/movies', moviesRouter);
// router.use('/series', seriesRouter);
// router.use('/order', orderRouter);
router.use('/user', userRouter);
router.use('/login', loginRouter);

module.exports = router;
