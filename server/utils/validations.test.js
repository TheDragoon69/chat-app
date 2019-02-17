//jshint esversion: 6

const expect = require('expect');

const {isRealString} = require('./validations.js');

describe('isRealString', () => {
    it('Should reject non-strings and strings with only space, should accept strings with non-space chars', () => {
        var pass = ' J en ';
        var notPass = '  ';

        expect(isRealString(pass)).toEqual(true);
        expect(isRealString(notPass)).toEqual(false);
    });
});
