const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index');
const expect = chai.expect;

chai.use(chaiHttp);

describe('Contacts API', () => {
  it('should add a new contact', (done) => {
    chai.request(app)
      .post('/contacts')
      .send({
        name: 'John Doe',
        phoneNumbers: ['1234567890', '0987654321'],
        image: 'https://example.com/image.jpg'
      })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.have.property('message').to.equal('Data Saved Successfully');
        expect(res.body.data).to.have.property('_id');
        done();
      });
  });

  it('should fetch all contacts', (done) => {
    chai.request(app)
      .get('/contacts')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('data').to.be.an('array');
        done();
      });
  });
  it('should search contacts by name', (done) => {
    chai.request(app)
      .get('/contacts/search?name=John')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
        done();
      });
  });

  it('should search contacts by phone number', (done) => {
    chai.request(app)
      .get('/contacts/search?phoneNumber=123')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
        done();
      });
  });

  it('should update a contact', (done) => {
    chai.request(app)
      .put('/contacts/663f15ab4057c93cb7520544') 
      .send({
        name: 'joe doe',
        phoneNumbers: ['1111111111', '2222222222']
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('_id');
        done();
      });
  });

  it('should delete a contact', (done) => {
    chai.request(app)
      .delete('/contacts/663f15ab4057c93cb7520544') 
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('message').to.equal('Contact deleted Successfully');
        done();
      });
  });

  it('should upload an image for a contact', (done) => {
    chai.request(app)
      .post('/contacts/:id/663f15ab4057c93cb7520544') 
      .attach('image', 'uploads/image.jpg') 
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('message').to.equal('Image uploaded');
        done();
      });
  });
});
