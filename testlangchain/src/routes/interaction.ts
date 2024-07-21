import { Router } from "express";
import { Interaction } from "../models/interaction";
import {
  IInteraction,
  IMessage,
  messageTypes,
} from "../interfaces/interactions";
import { instantiateBot } from "../utils/bot";

const router = Router();

/**
 * get all interactions
 */
router.get("/", async (req, res) => {
  try {
    const interactions = await Interaction.find().populate("patientId");
    res.json(interactions);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * create a new interaction for the given patient
 */
router.post("/new", async (req, res) => {
  const newMessage: IMessage = {
    from: messageTypes.USER,
    text: req.body.text,
    date: Date.now(),
  };

  // TODO: fetch new message from ai model
  const bot = instantiateBot();
  const botResponse = await bot.getResponse(req.body.text, []);

  // create new interaction
  const interaction = new Interaction<IInteraction>({
    patientId: req.body.patientId,
    doctorId: req.body.doctorId,
    date: Date.now(),
    messages: [newMessage, botResponse],
  });

  try {
    const newInteraction = await interaction.save();
    res.json({
      interactionId: newInteraction.toObject()._id,
      response: newInteraction.toObject().messages[1],
    });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
});

/**
 * continue conversation for a given interaction id
 */
router.post("/conversation", async (req, res) => {
  try {
    const interaction = await Interaction.findById(req.body.interactionId);
    if (!interaction || interaction?.patientId != req.body.patientId) {
      return res.status(404).json({ message: "Cannot find interaction" });
    }

    interaction.messages.push({
      text: req.body.text,
      date: Date.now(),
      from: messageTypes.USER,
    });

    // get reposnse from ai model
    const bot = instantiateBot();
    const botResponse = await bot.getResponse(req.body.text, interaction.messages);

    interaction.messages.push(botResponse);
    const updatedInteraction = await interaction.save();
    res.json({
      id: interaction._id,
      response:
        updatedInteraction.toObject().messages[
          updatedInteraction.toObject().messages.length - 1
        ],
    });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
});

/**
 * fetch all interactions for a given patient
 */
router.get("/fetchAll/:id", async (req, res) => {
  try {
    const interactions = await Interaction.find({ patientId: req.params.id });
    console.log(interactions);
    res.json(interactions);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
