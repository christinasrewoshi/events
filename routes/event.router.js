import express from 'express';
import { protect, admin } from '../middlewares/auth.middleware.js';
import { getAllEvents, getMyEvents, getEventById, updateEventStates, searchEvent } from '../controllers/event.controller.js';

const router = express.Router();

router.get('/', protect, admin, getAllEvents);             
router.get('/my', protect, getMyEvents);                  
router.get('/search', protect, searchEvent);              
router.get('/:id', protect, getEventById);               
router.put('/:id', protect, admin, updateEventStates);   

export default router;
