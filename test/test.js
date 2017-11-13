var request = require("request");
var base_url = "https://qhelp-mwarfa.c9users.io";
var app = require('../app');
var index = require('../routes/index.js');
var express = require('express');
var chai = require("chai");
chaiHttp = require('chai-http');
chai.use(chaiHttp);
chai.request(app);
var expect = chai.expect;

describe("Test if the buttons redirects to the correct path",function(){
  it('The login button takes us to the login page', function(done) { // <= Pass in done callback
    chai.request(app)
    .get('/loginPage')
    .end(function(err, res) {
    expect(res).to.have.status(200);
    done();                               // <= Call done to signal callback end
    });
  });
  
  it("The about button takes us to the about page", function(done){
      chai.request(app)
      .get('/aboutUs')
      .end(function(err,res){
        expect(res).to.have.status(200);
        done();
      });
  });

  it("The faQ button takes us to the faQ page", function(done){
      chai.request(app)
      .get('/faqPage')
      .end(function(err,res){
        expect(res).to.have.status(200);
        done();
      });
   });

  it("The Qatarhelp button takes us to the homepage", function(done){
      chai.request(app)
      .get('/main')
      .end(function(err,res){
        expect(res).to.have.status(200);
        done();
      });
   });
   
   
  it("The signup as a user gives us a user registration form", function(done){
      chai.request(app)
      .get('/userSignup')
      .end(function(err,res){
        expect(res).to.have.status(200);
        done();
      });
   });
   
   
  it("The signup as a business gives us a business registration form", function(done){
      chai.request(app)
      .get('/businessSignup')
      .end(function(err,res){
        expect(res).to.have.status(200);
        done();
      });
   });
   
});

describe("Test the login authentication procedures of the website",function(){
    
    it("should be able to login with the correct credentials", function(done){
        
        // Log in
    var agent = chai.request.agent(app)
    agent
      .post('/login')
      .send({ username: 'ali', password: 'ali' })
      .then(function (res) {
      expect(res).to.have.cookie('sessionid');
    // The `agent` now has the sessionid cookie saved, and will send it
    // back to the server in the next request:
      return agent.get('/user/me')
        .then(function (res) {
          expect(res).to.have.status(200);
        });
      });
    });
});