import { Router } from 'express';
import { Patient } from '../models/patient';

const router = Router();

router.get('/:id', async (req, res) => {
  try {
    const patient = await Patient.findOne({patientId: req.params.id});
    res.json(patient);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
