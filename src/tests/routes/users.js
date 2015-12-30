/*global describe, it */
'use strict';
var sinon = require('sinon');
var chai = require('chai');
var expect = chai.expect;

var users = require('../../../app/routes/users');

describe('Routes', () => {
    describe('GET Index', () => {
        it('should respond', () => {
            var req,res,spy;

            req = res = {};
            spy = res.send = sinon.spy();

            users(req, res);
            expect(spy.calledOnce).to.equal(true);
        });
    });
});
