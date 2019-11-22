import {
    IPostDetectRequest,
    IPostDetectResponse,
    postDetect,
} from './routes/item/postDetect';
import { json } from 'body-parser';
import * as path from 'path';
import * as cors from 'cors';
import * as express from 'express';
import { getAbout, IGetAboutResponse } from './routes/about/getAbout';
import {
    createRouteHandler,
    createRouteHandlerWithRequest,
} from './tools/createRouteHandler';

export function createApp(): express.Express {
    const app = express();

    app.use(json({ limit: '50mb' }));
    app.use(cors());
    app.set('json spaces', 4);

    // TODO: Can use for mocking test app: app.use(express.static(path.join(__dirname, '..', 'static')));

    app.get(
        ['/', '/about'],
        createRouteHandler<void, IGetAboutResponse>(getAbout),
    );

    app.post(
        '/detect',
        createRouteHandlerWithRequest<
            void,
            IPostDetectRequest,
            IPostDetectResponse
        >(postDetect),
    );

    return app;
}
