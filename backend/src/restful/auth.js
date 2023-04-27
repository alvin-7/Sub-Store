import { failed, success } from '@/restful/response';
import { NetworkError } from '@/restful/errors';
import { v4 as uuidv4 } from 'uuid';
import cache from '@/utils/lru'
import $ from '@/core/app';


export default function register($app) {
    $app.post('/api/verify', verify);
}

async function verify(req, res) {
    const password = req.body.password;

    try {
        if (password === $.env.password) {
            const token = uuidv4()
            cache.set(token, token)
            success(res, token);
        } else {
            failed(res, "verify failed")
        }
    } catch (err) {
        failed(
            res,
            new NetworkError(
                'FAILED_TO_GET_NODE_INFO',
                `Failed to get node info`,
                `Reason: ${err}`,
            ),
        );
    }
}
