import { _GLUCKOMETER2 } from './_GLUCKOMETER2';
import * as request from 'supertest';
import * as assert from 'assert';
import { createApp } from '../src/createApp';
import { _GLUCKOMETER1 } from './_GLUCKOMETER1';

jest.setTimeout(30000);

const app = createApp();

export default describe('Detection route', () => {
    it('should convert anonymous gluckometer screen ito a speech', () =>
        request(app)
            .post(`/detect`)
            .send({ gluckometerImage: _GLUCKOMETER1 })
            .expect(200)
            .then((response) => {
                assert.equal(response.body.data.glucoseValue, 15.9);
            }));

    it('should NOT convert anonymous gluckometer with multiple values on the screen ito a speech', () =>
        request(app)
            .post(`/detect`)
            .send({ gluckometerImage: _GLUCKOMETER2 })
            .expect(200)
            .then((response) => {
                assert.equal(response.body.data.glucoseValue, null);
            }));

    it('should NOT convert anonymous NON gluckometer screen ito a speech', () =>
        request(app)
            .post(`/detect`)
            .send({ gluckometerImage: _GLUCKOMETER2 })
            .expect(200)
            .then((response) => {
                assert.equal(response.body.data.glucoseValue, null);
            }));

    it('should NOT convert anonymous corrupted file', () =>
        request(app)
            .post(`/detect`)
            .send({ gluckometerImage: 'invalid file' })
            .expect(200)
            .then((response) => {
                assert.equal(response.body.data.glucoseValue, null);
            }));
});
