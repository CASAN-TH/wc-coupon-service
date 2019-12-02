'use strict';
var request = require('supertest'),
    assert = require('assert'),
    config = require('../../../config/config'),
    _ = require('lodash'),
    jwt = require('jsonwebtoken'),
    mongoose = require('mongoose'),
    app = require('../../../config/express'),
    Coupon = mongoose.model('Coupon');

var credentials,
    token,
    mockup;

describe('Coupon CRUD routes tests', function () {

    before(function (done) {
        mockup = {
            code:"10off",
            discount_type: "percent",
            amount: "10",
            individual_use: true,
            exclude_sale_items: true,
            minimum_amount: "100.00"
        };
        credentials = {
            username: 'username',
            password: 'password',
            firstname: 'first name',
            lastname: 'last name',
            email: 'test@email.com',
            roles: ['user']
        };
        token = jwt.sign(_.omit(credentials, 'password'), config.jwt.secret, {
            expiresIn: 2 * 60 * 60 * 1000
        });
        done();
    });

    it('should be Coupon get use token', (done)=>{
        request(app)
        .get('/api/coupons')
        .set('Authorization', 'Bearer ' + token)
        .expect(200)
        .end((err, res)=>{
            if (err) {
                return done(err);
            }
            var resp = res.body;
            done();
        });
    });

    it('should be Coupon get by id', function (done) {

        request(app)
            .post('/api/coupons')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                request(app)
                    .get('/api/coupons/' + resp.data._id)
                    .set('Authorization', 'Bearer ' + token)
                    .expect(200)
                    .end(function (err, res) {
                        if (err) {
                            return done(err);
                        }
                        var resp = res.body;
                        assert.equal(resp.status, 200);
                        assert.equal(resp.data.code, mockup.code);
                        assert.equal(resp.data.discount_type, mockup.discount_type);
                        assert.equal(resp.data.amount, mockup.amount);
                        assert.equal(resp.data.individual_use, mockup.individual_use);
                        assert.equal(resp.data.exclude_sale_items, mockup.exclude_sale_items);
                        assert.equal(resp.data.minimum_amount, mockup.minimum_amount);
                        done();
                    });
            });

    });

    it('should be Coupon post use token', (done)=>{
        request(app)
            .post('/api/coupons')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                assert.equal(resp.data.code, mockup.code);
                assert.equal(resp.data.discount_type, mockup.discount_type);
                assert.equal(resp.data.amount, mockup.amount);
                assert.equal(resp.data.individual_use, mockup.individual_use);
                assert.equal(resp.data.exclude_sale_items, mockup.exclude_sale_items);
                assert.equal(resp.data.minimum_amount, mockup.minimum_amount);
                
               
                done();
            });
    });

    it('should be coupon put use token', function (done) {

        request(app)
            .post('/api/coupons')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                var update = {
                    name: 'name update'
                }
                request(app)
                    .put('/api/coupons/' + resp.data._id)
                    .set('Authorization', 'Bearer ' + token)
                    .send(update)
                    .expect(200)
                    .end(function (err, res) {
                        if (err) {
                            return done(err);
                        }
                        var resp = res.body;
                        assert.equal(resp.data.code, mockup.code);
                        assert.equal(resp.data.discount_type, mockup.discount_type);
                        assert.equal(resp.data.amount, mockup.amount);
                        assert.equal(resp.data.individual_use, mockup.individual_use);
                        assert.equal(resp.data.exclude_sale_items, mockup.exclude_sale_items);
                        assert.equal(resp.data.minimum_amount, mockup.minimum_amount);
                        done();
                    });
            });

    });

    it('should be coupon delete use token', function (done) {

        request(app)
            .post('/api/coupons')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                request(app)
                    .delete('/api/coupons/' + resp.data._id)
                    .set('Authorization', 'Bearer ' + token)
                    .expect(200)
                    .end(done);
            });

    });

    xit('should be coupon get not use token', (done)=>{
        request(app)
        .get('/api/coupons')
        .expect(403)
        .expect({
            status: 403,
            message: 'User is not authorized'
        })
        .end(done);
    });

    xit('should be coupon post not use token', function (done) {

        request(app)
            .post('/api/coupons')
            .send(mockup)
            .expect(403)
            .expect({
                status: 403,
                message: 'User is not authorized'
            })
            .end(done);

    });

    it('should be coupon put not use token', function (done) {

        request(app)
            .post('/api/coupons')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                var update = {
                    name: 'name update'
                }
                request(app)
                    .put('/api/coupons/' + resp.data._id)
                    .send(update)
                    .expect(403)
                    .expect({
                        status: 403,
                        message: 'User is not authorized'
                    })
                    .end(done);
            });

    });

    it('should be coupon delete not use token', function (done) {

        request(app)
            .post('/api/coupons')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                request(app)
                    .delete('/api/coupons/' + resp.data._id)
                    .expect(403)
                    .expect({
                        status: 403,
                        message: 'User is not authorized'
                    })
                    .end(done);
            });

    });

    afterEach(function (done) {
        Coupon.remove().exec(done);
    });

});