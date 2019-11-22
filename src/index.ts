import { createApp } from './createApp';
import { PORT } from './config';

const app = createApp();

app.listen(PORT, () => {
    console.log(
        `█████████████████████████████████████████████████████████████████████`,
    );
    console.info(`API is running at http://localhost:${PORT}`);
});
