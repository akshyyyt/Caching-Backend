let cache = {}
const TTL = 60*1000

function cacheMiddleware(req, res, next) {
    if (req.method !== 'GET') {
        return next()
    }

    let key = req.url
    let entry = cache[key]

    if (entry) {
        let now = Date.now()
        if (now - entry.timestamp < TTL) {
            res.setHeader('X-Cache', 'HIT')
            return res.json(entry.data)
        }
    }

    res.setHeader('X-Cache', 'MISS')
    const originalJson = res.json.bind(res)
    
    res.json = (body) => {
        cache[key] = {
            timestamp: Date.now(),
            data: body
        }
        originalJson(body)
    }

    next()
}

function clearCache(req, res, next) {
    res.on('finish', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
            if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(req.method)) {
                cache = {}
            }
        }
    })
    next()
}

module.exports = {
    cacheMiddleware,
    clearCache
}
