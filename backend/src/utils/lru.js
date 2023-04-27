import { LRUCache } from 'lru-cache'

const options = {
    max: 50,
}
const cache = new LRUCache(options)

export default cache;
