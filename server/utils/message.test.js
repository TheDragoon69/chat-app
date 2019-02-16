var expect = require('expect');

var {generateMessage, generateLocationMessage} = require('./message.js');

describe('generateMessage', () => {
    it('should generate correct message object', () => {
        var from = 'Jen';
        var text = 'Some message';
        var createdAt = new Date().toLocaleString();

        var message = generateMessage(from,text);

        // expect(message.createdAt).toBe('number');
        expect(message).toEqual({createdAt, from, text});
    });
});

describe('generateLocationMessage', ()=> {
    it('should generate an object with longitude and latitude', () => {
        let from = 'Jen';
        let latitude = '5.6344208';
        let longitude = '-0.1696318';
        let createdAt = new Date().toLocaleString();
        url = `https://www.google.com/maps?q=${latitude},${longitude}`;

        var locMessage = generateLocationMessage(from, latitude, longitude);

        expect(locMessage).toEqual({from, url, createdAt});
    });
});