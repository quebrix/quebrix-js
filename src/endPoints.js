import {errorHandler} from "./utilities/globalErrorHandler.js";
import {customFetch} from "./utilities/customFetch.js";
import {partialItemEncoder} from "./utilities/UrlCreator.js";

async function setKey(baseUrl, payload) {
    /// expected payload {
    // cluster
    // key
    // value
    // }
    try {
        const url = `${baseUrl}/set`;
        const response = await customFetch(url, {
            method: 'POST',
            body: JSON.stringify(payload),

        });
        return await response.json()
    } catch (e) {
        errorHandler(e)
    }
}

async function getCluster(baseUrl, partials) {
    /// expected payload {
    // cluster
    // key
    // }
    try {
        let url = `${baseUrl}/get/${partialItemEncoder(partials.cluster)}/${partialItemEncoder(partials.key)}`;
        console.log(url)
        const response = await customFetch(url, {
            method: 'GET',
        });
        return await response.json()

    } catch (e) {
        errorHandler(e)
    }
}

async function deleteCluster(baseUrl, partials) {
    /// expected payload {
    // cluster
    // key
    // }
    try {
        const url = `${baseUrl}/delete/${partialItemEncoder(partials.cluster)}/${partialItemEncoder(partials.key)}`;
        const response = await customFetch(url, {
            method: 'DELETE',

        });
        return await response.json()

    } catch (e) {
        errorHandler(e)
    }
}

async function clearCluster(baseUrl, cluster) {
    /// expected string cluster
    try {
        const url = `${baseUrl}/clear_cluster/${partialItemEncoder(cluster)}`;
        const response = await customFetch(url, {
            method: 'DELETE'
        });
        return await response.json()

    } catch (e) {
        errorHandler(e)
    }
}

async function getKeysOfCluster(baseUrl, cluster) {
    /// expected string cluster
    try {
        const url = `${baseUrl}/get_keys/${partialItemEncoder(cluster)}`;
        const response = await customFetch(url, {
            method: 'GET',
        });
        return await response.json()

    } catch (e) {
        errorHandler(e)
    }
}

async function setCluster(baseUrl, cluster) {
    /// expected string cluster

    try {
        const url = `${baseUrl}/set_cluster${partialItemEncoder(cluster)}`;
        const response = await customFetch(url, {
            method: 'POST',
        });
        return await response.json()

    } catch (e) {
        errorHandler(e)
    }
}

async function checkConnection(baseUrl) {
    try {
        const url = `${baseUrl}/get/check`;
        const response = await customFetch(url, {
            method: 'GET',
        });
        return await response.json()

    } catch (e) {
        errorHandler(e)
    }
}

async function getAllClusters(baseUrl) {
    try {
        const url = `${baseUrl}/get_clusters`;
        const response = await customFetch(url, {
            method: 'GET',

        });
        return await response.json()

    } catch (e) {
        errorHandler(e)
    }
}

export {
    getAllClusters,
    setKey,
    getCluster,
    deleteCluster,
    clearCluster,
    getKeysOfCluster,
    setCluster,
    checkConnection
}
