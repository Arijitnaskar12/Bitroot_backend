const express=require('express');
const mongoose=require('mongoose');
const multer=require('multer');
const csvWriter=require('csv-writer').createObjectCsvWriter;
const Contact=require('./Model/contact.db');
const db=require("./config/db");
require('dotenv').config();
const app=express();
app.use(express.json());
const upload=multer({dest:"uploads/"});
app.post('/contacts', upload.single('image'), async (req, res) => {
    try {
      const { name, phoneNumbers,image } = req.body;
      const phoneNumbersArray = phoneNumbers.map(num => ({ number: num }));
  
      const existingNumber = await Contact.findOne({ 'phoneNumbers.number': { $in: phoneNumbersArray.map(num => num.number) } });
      if (existingNumber) {
        return res.status(400).json({ message: 'Phone number already exists' });
      }
  
      const contact = new Contact({
        name,   
        phoneNumbers: phoneNumbersArray,
        image: image
      });
  
      await contact.save();
      res.status(201).send({
        Message:"Data Saved Successfully",
        data:contact
      });
    } catch (error) {
      res.status(500).json({ message: 'Error creating contact', error });
    }
  });
  app.delete('/contacts/:id', async (req, res) => {
    try {
      const contactId = req.params.id;
      await Contact.findByIdAndDelete(contactId);
      res.status(200).send({ message: 'Contact deleted Successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting contact', error });
    }
  });
  
  app.get('/contacts', async (req, res) => {
    try {
      const contacts = await Contact.find();
      res.status(200).send({
        data:contacts
      });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching contacts', error });
    }
  });
 
  app.get('/contacts/search', async (req, res) => {
    try {
      const { name, phoneNumber } = req.query;
  
      let query = {};
      if (name) {
        query.name = { $regex: name, $options: 'i' };
      }
  
      if (phoneNumber) {
        query['phoneNumbers.number'] = { $regex: phoneNumber, $options: 'i' };
      }
  
      const contacts = await Contact.find(query);
      res.json(contacts);
    } catch (error) {
      res.status(500).json({ message: 'Error searching contacts', error });
    }
  });
  
  app.put('/contacts/:id', async (req, res) => {
    try {
      const contactId = req.params.id;
      const { name, phoneNumbers } = req.body;
  
      const phoneNumbersArray = phoneNumbers.map(num => ({ number: num }));
  
      const contact = await Contact.findByIdAndUpdate(contactId, {
        name,
        phoneNumbers: phoneNumbersArray
      }, { new: true });
  
      res.json(contact);
    } catch (error) {
      res.status(500).json({ message: 'Error updating contact', error });
    }
  });
  
 
  app.post('/contacts/:id/upload', upload.single('image'), async (req, res) => {
    try {
      const contactId = req.params.id;
      const contact = await Contact.findById(contactId);
  
      if (!contact) {
        return res.status(404).json({ message: 'Contact not found' });
      }
  
      contact.image =req.body;
      await contact.save();
  
      res.json({ message: 'Image uploaded', contact });
    } catch (error) {
      res.status(500).json({ message: 'Error uploading image', error });
    }
  });
  app.get('/contacts/export', async (req, res) => {
    try {
      const contacts = await Contact.find();
  
      const csvWriterInstance = csvWriter({
        path: 'contacts.csv',
        header: [
          { id: 'name', title: 'Name' },
          { id: 'phoneNumbers', title: 'Phone Numbers' },
          { id: 'image', title: 'Image' }
        ]
      });
  
      const csvData = contacts.map(contact => ({
        name: contact.name,
        phoneNumbers: contact.phoneNumbers.map(num => num.number).join(', '),
        image: contact.image
      }));
  
      await csvWriterInstance.writeRecords(csvData);
  
      res.download('contacts.csv', 'contacts.csv');
    } catch (error) {
      res.status(500).json({ message: 'Error exporting contacts', error });
    }
  });
  
const PORT=5000;
app.get('/',(req,res)=>{
    res.send("Hello World");
})
app.listen(PORT,()=>{
    console.log(`Server is running on the port ${PORT}`);
})