import * as request from 'supertest';
import * as assert from 'assert';
import { createApp } from '../src/createApp';
import { _GLUCKOMETER1 } from './_GLUCKOMETER1';

const app = createApp();

export default describe('Detection route', () => {
    it('should convert anonymous gluckometer screen ito a speech', () =>
        request(app)
            .post(`/detect`)
            .send(_GLUCKOMETER1)
            .expect(200)
            .then((response) => {
                assert.equal(response.body.data.glucoseValue, 15.9);
            }));
});
