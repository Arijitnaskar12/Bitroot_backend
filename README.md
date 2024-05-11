# Contact List API

This is a RESTful API built with Node.js, Express, and MongoDB for managing contacts. It provides various endpoints for creating, retrieving, updating, and deleting contacts, as well as exporting contacts to a CSV file.

## Features

- **Create New Contact**: Add a new contact with name, phone numbers, and optional image.
- **Delete Contact**: Remove a contact by its ID.
- **Fetch All Contacts**: Retrieve a list of all contacts.
- **Search Contacts**: Search contacts by name or phone number.
- **Update Contact**: Modify an existing contact's information.
- **Upload Image for Contact**: Upload an image for a contact.
- **Export Contacts to CSV**: Export all contacts to a CSV file.

## Prerequisites

Ensure you have the following installed on your machine:

- Node.js
- MongoDB
## Endpoints

- **POST /contacts**: Create a new contact.
  - Request body:
    ```json
    {
      "name": "John Doe",
      "phoneNumbers": ["1234567890", "0987654321"],
      "image": "https://example.com/image.jpg"
    }
    ```
  - Response:
    ```json
    {
      "message": "Data Saved Successfully",
      "data": {
        "_id": "60a9e01bb2bb2d0015e66945",
        "name": "John Doe",
        "phoneNumbers": ["1234567890", "0987654321"],
        "image": "https://example.com/image.jpg",
        "__v": 0
      }
    }
    ```

- **DELETE /contacts/:id**: Delete a contact by ID.
  - Response:
    ```json
    {
      "message": "Contact deleted Successfully"
    }
    ```

- **GET /contacts**: Fetch all contacts.
  - Response:
    ```json
    {
      "data": [
        {
          "_id": "60a9e01bb2bb2d0015e66945",
          "name": "John Doe",
          "phoneNumbers": ["1234567890", "0987654321"],
          "image": "https://example.com/image.jpg",
          "__v": 0
        },
        {
          "_id": "60a9e8b0c22c9b0015a9b160",
          "name": "Jane Smith",
          "phoneNumbers": ["9876543210", "0123456789"],
          "image": null,
          "__v": 0
        }
      ]
    }
    ```

- **GET /contacts/search**: Search contacts by name or phone number.
  - Query parameters:
    - `name`: Name of the contact.
    - `phoneNumber`: Phone number of the contact.
  - Response:
    ```json
    [
      {
        "_id": "60a9e01bb2bb2d0015e66945",
        "name": "John Doe",
        "phoneNumbers": ["1234567890", "0987654321"],
        "image": "https://example.com/image.jpg",
        "__v": 0
      }
    ]
    ```

- **PUT /contacts/:id**: Update a contact by ID.
  - Request body:
    ```json
    {
      "name": "Updated Name",
      "phoneNumbers": ["1111111111", "2222222222"]
    }
    ```
  - Response:
    ```json
    {
      "_id": "60a9e01bb2bb2d0015e66945",
      "name": "Updated Name",
      "phoneNumbers": ["1111111111", "2222222222"],
      "image": "https://example.com/image.jpg",
      "__v": 0
    }
    ```

- **POST /contacts/:id/upload**: Upload an image for a contact.
  - Request body:
    - Form data with key "image" and image file.
  - Response:
    ```json
    {
      "message": "Image uploaded",
      "contact": {
        "_id": "60a9e01bb2bb2d0015e66945",
        "name": "John Doe",
        "phoneNumbers": ["1234567890", "0987654321"],
        "image": "uploads/image.jpg",
        "__v": 0
      }
    }
    ```

- **GET /contacts/export**: Export all contacts to a CSV file.


## Installation

1. Clone this repository:

```bash
git clone https://github.com/your-username/Bitroot_backend.git
cd Bitroot_backend
npm install
npm start
