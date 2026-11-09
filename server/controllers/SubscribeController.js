const prisma = require("../lib/prisma");
const { base } = require("../utils/serialize");

// Get all subscribers
const getSubscribes = async (req, res) => {
  try {
    const subscribers = await prisma.subscribe.findMany({
      orderBy: { createdAt: "desc" },
    });
    return res.send(subscribers.map(base));
  } catch (_error) {
    return res.status(500).send({ message: "Server Error" });
  }
};

// Add a new subscriber
const addSubscribe = async (req, res) => {
  const { email } = req.body;
  try {
    const newSubscriber = await prisma.subscribe.create({ data: { email } });
    return res.send({ success: true, newSubscriber: base(newSubscriber) });
  } catch (_error) {
    return res.status(400).send({ message: "Invalid input" });
  }
};

// Delete a subscriber by ID
const deleteSubscribe = async (req, res) => {
  try {
    const deletedSubscriber = await prisma.subscribe.delete({
      where: { id: req.params.id },
    });
    return res.send({ succes: true, deletedSubscriber: base(deletedSubscriber) });
  } catch (_error) {
    return res.status(404).send({ message: "Subscriber not found" });
  }
};

module.exports = { getSubscribes, addSubscribe, deleteSubscribe };
