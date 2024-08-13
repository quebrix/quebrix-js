let fetch;

if (typeof globalThis.fetch !== 'function') {
    // Node.js < 18: use node-fetch
    fetch = (import('node-fetch')).default;
} else {
    // Node.js >= 18: use native fetch
    fetch = globalThis.fetch;
}

async function customFetch(url, options) {
    return await fetch(url, {
        ...options,
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

export {
    customFetch
}
