const prisma = require("../lib/prisma");
const { base } = require("../utils/serialize");

// Get all contacts
exports.getContacts = async (req, res) => {
  try {
    const contacts = await prisma.contact.findMany({ orderBy: { createdAt: "desc" } });
    if (contacts.length === 0) {
      return res.end();
    }
    return res.send({ success: true, contacts: contacts.map(base) });
  } catch (error) {
    return res.send({ error: error.message });
  }
};

// Add a new contact
exports.addContact = async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;
    const newContact = await prisma.contact.create({
      data: { name, email, phone, subject, message },
    });
    return res.send({
      success: true,
      data: base(newContact),
      msg: "Contact added",
    });
  } catch (error) {
    return res.send({ error: error.message });
  }
};

// Get a contact by ID
exports.getContactById = async (req, res) => {
  try {
    const contact = await prisma.contact.findUnique({ where: { id: req.params.id } });
    if (!contact) {
      return res.send({ error: "Contact not found" });
    }
    return res.send({ success: true, contact: base(contact) });
  } catch (error) {
    return res.send({ error: error.message });
  }
};

// Delete a contact by ID
exports.deleteContact = async (req, res) => {
  try {
    const deletedContact = await prisma.contact.delete({ where: { id: req.params.id } });
    return res.send({
      success: true,
      msg: "Contact deleted successfully",
      data: base(deletedContact),
    });
  } catch (_error) {
    return res.send({ error: "Contact not found" });
  }
};
