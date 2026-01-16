import Event from '../models/event.model.js';

export const getAllEvents = async (req, res, next) => {
  try {
    const events = await Event.find().populate('userId', 'name email');
    res.json({ success: true, events });
  } catch (err) { next(err); }
};

export const getMyEvents = async (req, res, next) => {
  try {
    const events = await Event.find({ userId: req.user._id });
    res.json({ success: true, events });
  } catch (err) { next(err); }
};

export const getEventById = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id).populate('userId', 'name email');
    if (!event) return res.status(404).json({ success: false, message: 'Event not found' });
    res.json({ success: true, event });
  } catch (err) { next(err); }
};

export const updateEventStates = async (req, res, next) => {
  try {
    const { eventStatus } = req.body;
    if (!['pending','approved','rejected'].includes(eventStatus)) 
      return res.status(400).json({ success: false, message: 'Invalid status' });

    const event = await Event.findByIdAndUpdate(req.params.id, { eventStatus }, { new: true });
    if (!event) return res.status(404).json({ success: false, message: 'Event not found' });

    res.json({ success: true, event });
  } catch (err) { next(err); }
};

export const searchEvent = async (req, res, next) => {
  try {
    const { name, states } = req.query; 
    let query = {};
    if (name) query.eventName = { $regex: name, $options: 'i' };
    if (states) query.eventStatus = { $in: states.split(',') };

    const events = await Event.find(query).populate('userId', 'name email');
    res.json({ success: true, events });
  } catch (err) { next(err); }
};
