import { Router } from 'express';
import { Doctor } from '../models/doctor';

const router = Router();

router.get('/:id', async (req, res) => {
  try {
    const doctor = await Doctor.findOne({doctorId: req.params.id});
    res.json(doctor);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
