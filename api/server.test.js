const express = require("express");
const supertest = require("supertest");
const server = require("./server");
const db = require("../data/dbconnection");
const PropertyDb = require('../PropertyRouter/property-model.js');
const ImageDb = require('../PropertyRouter/image-model.js')


describe('server', () => {

  // beforeEach(async () => {
  //   await db('users').truncate();
  //   await db('property').truncate();
  //   await db('property_image').truncate();
  //   await db('price').truncate();

  // });

  

  describe('GET /', () => {
    
    it('Should return 200 correctly', async () => {
      const res = await supertest(server).get('/');
      expect(res.status).toEqual(200);
    });
    it('Should return Hello property Hello: "World, The api is working"  correctly', async () => {
      const res = await supertest(server).get('/');
      expect(res.body.Hello).toBe("World, The api is working")
    });
    it('Should return JSON Object',  () => {
      return supertest(server).get('/').expect({Hello: "World, The api is working"})
    });
  });
  
  // test User Endpoint start here
  describe('user route End poitn',  () => {
    beforeEach(() => {
       db('users').truncate();
    });
    describe('GET / Property', () => {
      it('Should return Register seccesfull if register correctly', async () => {
        const userTest = await supertest(server)
          .post('/api/auth/register')
          .send({name: "khwanchai", username: "porpan", password: "03248428"});
          const loginUser = await supertest(server).post("/api/auth/login").send({username: "porpan", password: "03248428"}) 
        const token = loginUser.body.token;

        const userTest1 = await supertest(server).get('/api/users').set({
          authorization: token,
        }) 
        expect(userTest1.status).toBe(200)
      });

      it("Should return 200 correctly if login with valid users", async () =>{
        const userTest = await supertest(server)
        .post('/api/auth/register')
        .send({name: "khwan", username: "khwanwill", password: "03248428"});
        
        const loginUser = await supertest(server).post("/api/auth/login").send({username: "khwanwill", password: "03248428"}) 
        const token = loginUser.body.token;

        const userTest1 = await supertest(server).get('/api/users').set({
          authorization: token,
        }) 
        expect(userTest1.status).toBe(200)
      })
      it('Should return 401 if do not have token',  async () => {
        const userTest = await supertest(server)
        .post('/api/auth/register')
        .send({name: "khwanchai", username: "willTech", password: "03248428"});
        
        const loginUser = await supertest(server).post("/api/auth/login").send({username: "willTech", password: "03248428"}) 
        const token = loginUser.body.token;

        const userTest1 = await supertest(server).get('/api/users')
        expect(userTest1.status).toBe(401)
      });

     
    });

    describe('GET /api/users/:id ', () => {

       it('Should return 200 correctly if had correct id', async () => {
        const userTest = await supertest(server)
        .post('/api/auth/register')
        .send({name: "khwanchai", username: "willTech", password: "03248428"});
        
        const loginUser = await supertest(server).post("/api/auth/login").send({username: "willTech", password: "03248428"}) 
        const token = loginUser.body.token;

        const userTest1 = await supertest(server).get('/api/users/1').set({
          authorization: token,
        }) 
        expect(userTest1.status).toBe(200)
      });

      it('Should return 404 correctly if has not correct id', async () => {
        const userTest = await supertest(server)
        .post('/api/auth/register')
        .send({name: "khwanchai", username: "willTech", password: "03248428"});
        
        const loginUser = await supertest(server).post("/api/auth/login").send({username: "willTech", password: "03248428"}) 
        const token = loginUser.body.token;

        const userTest1 = await supertest(server).get('/api/users/0').set({
          authorization: token,
        }) 
        expect(userTest1.status).toBe(404)
      });
      it('Should return property of message if not have correct id ', async () => {
        const userTest = await supertest(server)
        .post('/api/auth/register')
        .send({name: "khwanchai", username: "willTech", password: "03248428"});
        
        const loginUser = await supertest(server).post("/api/auth/login").send({username: "willTech", password: "03248428"}) 
        const token = loginUser.body.token;

        const userTest1 = await supertest(server).get('/api/users/0').set({
          authorization: token,
        }) 
        expect(userTest1.body.message).toBe("Could not find users for given user")
      });

    })

    describe('POST /api/users', () => {
      it('Should return property of message ', async () => {
        const userTest = await supertest(server)
        .post('/api/auth/register')
        .send({name: "khwanchai", username: "willTech", password: "03248428"});
        
        const loginUser = await supertest(server).post("/api/auth/login").send({username: "willTech", password: "03248428"}) 
        const token = loginUser.body.token;

        const userTest1 = await supertest(server).get('/api/users/0').set({
          authorization: token,
        }) 
        expect(userTest1.body.message).toBe("Could not find users for given user")
      });

    });

    describe('POST /api/users/property', () => {
      it('Should return 200 if create property succesfull', async () => {
        
        const userTest = await supertest(server)
        .post('/api/auth/register')
        .send({name: "khwanchai", username: "willTech", password: "03248428"});
        
        const loginUser = await supertest(server).post("/api/auth/login").send({username: "willTech", password: "03248428"}) 
        const token = loginUser.body.token;

        const userTest1 = await supertest(server).post('/api/users/property').set({
          authorization: token,
        })       
      });

    });

    describe('DELETE /users by id', () => {
      it('Should return 404 correctly if had no id', async () => {
        const userTest = await supertest(server)
        .post('/api/auth/register')
        .send({name: "khwanchai", username: "willTech", password: "03248428"});
        
        const loginUser = await supertest(server).post("/api/auth/login").send({username: "willTech", password: "03248428"}) 
        const token = loginUser.body.token;

        const userTest1 = await supertest(server).delete('/api/users/0').set({
          authorization: token,
        }) 
        expect(userTest1.status).toBe(404)
      });

      it('Should return message propter "please provide credentials" if not login ', async () => {
        const userTest = await supertest(server)
        .post('/api/auth/register')
        .send({name: "khwanchai", username: "willTech", password: "03248428"});
        
        const loginUser = await supertest(server).post("/api/auth/login").send({username: "willTech", password: "03248428"}) 
        const token = loginUser.body.token;

        const userTest1 = await supertest(server).delete('/api/users/')
        expect(userTest1.body.message).toBe("please provide credentials")
      });

      it('Should return 404 correctly if had no id', async () => {
        const userTest = await supertest(server)
        .post('/api/auth/register')
        .send({name: "khwanchai", username: "willTech", password: "03248428"});
        
        const loginUser = await supertest(server).post("/api/auth/login").send({username: "willTech", password: "03248428"}) 
        const token = loginUser.body.token;

        const userTest1 = await supertest(server).delete('/api/users/0').set({
          authorization: token,
        }) 
        expect(userTest1.body.message).toBe('Could not find user with given id')
      });

    });

  })
  // Finish User endpoint test 

  // Start the Property endpoint test from here <<----->>
  describe('Property Route endpoint', () => {

    describe('GET /properties', () => {
      it("Should return 200 correctly if login with valid users", async () =>{
        const userTest = await supertest(server)
        .post('/api/auth/register')
        .send({name: "khwanchai", username: "willTech", password: "03248428"});
        
        const loginUser = await supertest(server).post("/api/auth/login").send({username: "willTech", password: "03248428"}) 
        const token = loginUser.body.token;

        const userTest1 = await supertest(server).get('/api/properties').set({
          authorization: token,
        }) 
        expect(userTest1.status).toBe(200)
      })
      it('Should return 401 if do not have token',  async () => {
        const userTest = await supertest(server)
        .post('/api/auth/register')
        .send({name: "khwanchai", username: "willTech", password: "03248428"});
        
        const loginUser = await supertest(server).post("/api/auth/login").send({username: "willTech", password: "03248428"}) 
        const token = loginUser.body.token;

        const userTest1 = await supertest(server).get('/api/properties')
        expect(userTest1.status).toBe(401)
      });

    });

    describe('GET /api/properties/:id ', () => {

       it('Should return 200 correctly if had correct id', async () => {     
    
        const userTest = await supertest(server)
        .post('/api/auth/register')
        .send({name: "khwanchai", username: "willTech", password: "03248428"});
        
        const loginUser = await supertest(server).post("/api/auth/login").send({username: "willTech", password: "03248428"}) 
        const token = loginUser.body.token;
        const userTest1 = await supertest(server).get('/api/properties/').set({
          authorization: token,
        }) 
        expect(userTest1.status).toBe(200)
      });

      it('Should return 404 correctly if has not correct id', async () => {
        const userTest = await supertest(server)
        .post('/api/auth/register')
        .send({name: "khwanchai", username: "willTech", password: "03248428"});
        
        const loginUser = await supertest(server).post("/api/auth/login").send({username: "willTech", password: "03248428"}) 
        const token = loginUser.body.token;

        const userTest1 = await supertest(server).get('/api/properties/0').set({
          authorization: token,
        }) 
        expect(userTest1.status).toBe(404)
      });
      it('Should return property of message if not have correct id ', async () => {
        const userTest = await supertest(server)
        .post('/api/auth/register')
        .send({name: "khwanchai", username: "willTech", password: "03248428"});
        
        const loginUser = await supertest(server).post("/api/auth/login").send({username: "willTech", password: "03248428"}) 
        const token = loginUser.body.token;

        const userTest1 = await supertest(server).get('/api/properties/0').set({
          authorization: token,
        }) 
        expect(userTest1.body.message).toBe("Could not find house with given id.")
      });

    })

    describe('POST /api/properties', () => {
      it('Should return property of message ', async () => {
        const userTest = await supertest(server)
        .post('/api/auth/register')
        .send({name: "khwanchai", username: "willTech", password: "03248428"});
        
        const loginUser = await supertest(server).post("/api/auth/login").send({username: "willTech", password: "03248428"}) 
        const token = loginUser.body.token;

        const userTest1 = await supertest(server).get('/api/properties/0').set({
          authorization: token,
        }) 
        expect(userTest1.body.message).toBe("Could not find house with given id.")
      });

    });

    describe('POST /api/property', () => {
      it('Should return 500 if create error', async () => {
        
        const userTest = await supertest(server)
        .post('/api/auth/register')
        .send({name: "khwanchai", username: "willTech", password: "03248428"});
        
        const loginUser = await supertest(server).post("/api/auth/login").send({username: "willTech", password: "03248428"}) 
        const token = loginUser.body.token;

        const userTest1 = await supertest(server).post('/api/properties').set({
          authorization: token,
        }) 

        const properyTest =  PropertyDb.add({
          user_id: 1,
          name: "Villa beach",
          description: "Nice house infront of the beach",
          type: "Entier Home",
          location: "Phuket, Thailand",
          bedroom: 4,
          bathroom: 2.5
        })
       
        expect(userTest1.status).toBe(500)

      });

    });

    describe('DELETE /property by id', () => {
      it('Should return 404 correctly if had no id', async () => {
        const userTest = await supertest(server)
        .post('/api/auth/register')
        .send({name: "khwanchai", username: "willTech", password: "03248428"});
        
        const loginUser = await supertest(server).post("/api/auth/login").send({username: "willTech", password: "03248428"}) 
        const token = loginUser.body.token;

        const userTest1 = await supertest(server).delete('/api/properties/0').set({
          authorization: token,
        }) 
        expect(userTest1.status).toBe(404)
      });

      it('Should return 404 correctly if had no id', async () => {
        const userTest = await supertest(server)
        .post('/api/auth/register')
        .send({name: "black&Pink", username: "blackPink", password: "03248428"});
        
        const loginUser = await supertest(server).post("/api/auth/login").send({username: "blackPink", password: "03248428"}) 
        const token = loginUser.body.token;

        const userTest1 = await supertest(server).delete('/api/properties/0').set({
          authorization: token,
        }) 
        expect(userTest1.status).toBe(404)
      });
      it('Should return 404 correctly if had no id', async () => {
        const userTest = await supertest(server)
        .post('/api/auth/register')
        .send({name: "black&Pink", username: "blackPink", password: "03248428"});
        
        const loginUser = await supertest(server).post("/api/auth/login").send({username: "blackPink", password: "03248428"}) 
        const token = loginUser.body.token;

        const userTest1 = await supertest(server).delete('/api/properties/0').set({
          authorization: token,
        }) 
        expect(userTest1.body.message).toBe('Could not find house with given id')
      });

    });

  }) // finsih Property route endpoint test here <<---


  // Start Image route endpoing here
  
  describe('Property Images Route endpoint', () => {

    describe('GET /images', () => {
      it("Should return 200 correctly if login with valid users", async () =>{
        const userTest = await supertest(server)
        .post('/api/auth/register')
        .send({name: "khwanchai", username: "willTech", password: "03248428"});
        
        const loginUser = await supertest(server).post("/api/auth/login").send({username: "willTech", password: "03248428"}) 
        const token = loginUser.body.token;

        const userTest1 = await supertest(server).get('/api/images').set({
          authorization: token,
        }) 
        expect(userTest1.status).toBe(200)
      })
      it('Should return 401 if do not have token',  async () => {
        const userTest = await supertest(server)
        .post('/api/auth/register')
        .send({name: "khwanchai", username: "willTech", password: "03248428"});
        
        const loginUser = await supertest(server).post("/api/auth/login").send({username: "willTech", password: "03248428"}) 
        const token = loginUser.body.token;

        const userTest1 = await supertest(server).get('/api/images')
        expect(userTest1.status).toBe(401)
      });

    });

    describe('GET /api/images/:id ', () => {

       it('Should return 200 if valid id', async () => {     
    
        const userTest = await supertest(server)
        .post('/api/auth/register')
        .send({name: "khwanchai", username: "willTech", password: "03248428"});
        
        const loginUser = await supertest(server).post("/api/auth/login").send({username: "willTech", password: "03248428"}) 
        const token = loginUser.body.token;
        const userTest1 = await supertest(server).get('/api/images/').set({
          authorization: token,
        }) 
        expect(userTest1.status).toBe(200)
      });

      it('Should return 400 correctly if has not correct id', async () => {
        const userTest = await supertest(server)
        .post('/api/auth/register')
        .send({name: "khwanchai", username: "willTech", password: "03248428"});
        
        const loginUser = await supertest(server).post("/api/auth/login").send({username: "willTech", password: "03248428"}) 
        const token = loginUser.body.token;

        const userTest1 = await supertest(server).get('/api/images/0').set({
          authorization: token,
        }) 
        expect(userTest1.status).toBe(400)
      });
      it('Should return property of message if not have correct id ', async () => {
        const userTest = await supertest(server)
        .post('/api/auth/register')
        .send({name: "khwanchai", username: "willTech", password: "03248428"});
        
        const loginUser = await supertest(server).post("/api/auth/login").send({username: "willTech", password: "03248428"}) 
        const token = loginUser.body.token;

        const userTest1 = await supertest(server).get('/api/images/0').set({
          authorization: token,
        }) 
        expect(userTest1.body.message).toBe("invalid image id")
      });

    })

    describe('POST /api/images', () => {
      it('Should return property of message ', async () => {
        const userTest = await supertest(server)
        .post('/api/auth/register')
        .send({name: "khwanchai", username: "willTech", password: "03248428"});
        
        const loginUser = await supertest(server).post("/api/auth/login").send({username: "willTech", password: "03248428"}) 
        const token = loginUser.body.token;

        const userTest1 = await supertest(server).get('/api/images/0').set({
          authorization: token,
        }) 
        expect(userTest1.body.message).toBe("invalid image id")
      });

    });

    describe('POST /api/images into property', () => {
      it('Should return 500 if create error', async () => {
        
        const userTest = await supertest(server)
        .post('/api/auth/register')
        .send({name: "khwanchai", username: "willTech", password: "03248428"});
        
        const loginUser = await supertest(server).post("/api/auth/login").send({username: "willTech", password: "03248428"}) 
        const token = loginUser.body.token;

        const userTest1 = await supertest(server).post('/api/images').set({
          authorization: token,
        }) 

        const testImage =  ImageDb.insert({
          property_id: 1,
          image: "https://images.unsplash.com/photo-1585551897142-80acdcaab4b5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
        })
       
        expect(userTest1.status).toBe(500)

      });

    });

    describe('PUT /api/images/:id into property', () => {
      it('Should return 400 if give the wrong id', async () => {
        
        const userTest = await supertest(server)
        .post('/api/auth/register')
        .send({name: "khwanchai", username: "willTech", password: "03248428"});
        
        const loginUser = await supertest(server).post("/api/auth/login").send({username: "willTech", password: "03248428"}) 
        const token = loginUser.body.token;

        const userTest1 = await supertest(server).put('/api/images/0').set({
          authorization: token,
        }) 

        const testImage =  ImageDb.insert({
          property_id: 1,
          image: "https://images.unsplash.com/photo-1585551897142-80acdcaab4b5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
        })
       
        expect(userTest1.status).toBe(400)

      });

    });

    describe('DELETE /images by id', () => {
      it('Should return 400 correctly if had no id', async () => {
        const userTest = await supertest(server)
        .post('/api/auth/register')
        .send({name: "khwanchai", username: "willTech", password: "03248428"});
        
        const loginUser = await supertest(server).post("/api/auth/login").send({username: "willTech", password: "03248428"}) 
        const token = loginUser.body.token;

        const userTest1 = await supertest(server).delete('/api/images/0').set({
          authorization: token,
        }) 
        expect(userTest1.status).toBe(400)
      });

      it('Should return 404 correctly if had no id', async () => {
        const userTest = await supertest(server)
        .post('/api/auth/register')
        .send({name: "black&Pink", username: "blackPink", password: "03248428"});
        
        const loginUser = await supertest(server).post("/api/auth/login").send({username: "blackPink", password: "03248428"}) 
        const token = loginUser.body.token;

        const userTest1 = await supertest(server).delete('/api/images/0').set({
          authorization: token,
        }) 
        expect(userTest1.body.message).toBe('invalid image id')
      });
      it('Should return 400 correctly if had no id', async () => {
        const userTest = await supertest(server)
        .post('/api/auth/register')
        .send({name: "black&Pink", username: "blackPink", password: "03248428"});
        
        const loginUser = await supertest(server).post("/api/auth/login").send({username: "blackPink", password: "03248428"}) 
        const token = loginUser.body.token;

        const userTest1 = await supertest(server).delete('/api/images/0').set({
          authorization: token,
        }) 
        expect(userTest1.status).toBe(400)
      });

    });

  })

})