import {
    checkConnection,
    clearCluster,
    deleteCluster,
    getAllClusters,
    getCluster,
    getKeysOfCluster,
    setCluster,
    setKey,
} from "./endPoints.js";
import {setToken} from "./utilities/customFetch.js";

// ApiResponse class
class ApiResponse {
    constructor(isSuccess, data) {
        this.isSuccess = isSuccess;
        this.data = data;
    }

    static fromDict(data) {
        return new ApiResponse(data.is_success, data.data);
    }

    decodeData(encoding = "utf-8") {
        if (Array.isArray(this.data)) {
            return Buffer.from(this.data).toString(encoding);
        }
        return this.data;
    }
}


class RusselClient {

    constructor(username,password) {
        this.baseUrl = "http://127.0.0.1:6022/api";
        this.username = username
        this.password = password
    }

    async setRusselConfig(russelConfig) {
        this.baseUrl = `${russelConfig.baseUrl ? russelConfig.baseUrl : 'http://127.0.0.1'}:${russelConfig.port ? russelConfig.port : '6022'}/api`;
        if (russelConfig.password) {
            this.password = russelConfig.password
        }
        if (russelConfig.username) {
            this.username = russelConfig.username
        }
    }
    async authorize() {
        await this.setGlobalAuthHeader()
        setToken(this.authHeaderValue)

    }
    async setGlobalAuthHeader() {
        const encoder = new TextEncoder()
        const authHeaderByte: any = encoder.encode(this.username.concat(':', this.password))
        this.authHeaderValue = btoa(String.fromCharCode.apply(null, authHeaderByte))
    }
     async _handleResponse(response) {
        if (!response.is_success) {
            throw new Error(response.message || "Unknown error");
        }
        return ApiResponse.fromDict(response.data);
    }

    async set(payload) {
        const response = await setKey(this.baseUrl, payload);
        return await this._handleResponse(response);
    }

    async get(partials) {
        const response = await getCluster(this.baseUrl, partials);
        return await this._handleResponse(response);
    }

    async delete(partials) {
        const response = await deleteCluster(this.baseUrl, partials);
        return await this._handleResponse(response);
    }

    async clearCluster(cluster) {
        const response = await clearCluster(this.baseUrl, cluster);
        return await this._handleResponse(response);
    }

    async getKeysOfCluster(cluster) {
        const response = await getKeysOfCluster(this.baseUrl, cluster);
        return await this._handleResponse(response);
    }

    async getAllClusters() {
        const response = await getAllClusters(this.baseUrl);
        return await this._handleResponse(response);
    }

    async setCluster(cluster) {
        const response = await setCluster(this.baseUrl, cluster);
        return await this._handleResponse(response);
    }

    async checkConnection() {
        const response = await checkConnection(this.baseUrl);
        return await this._handleResponse(response);
    }
}

export default RusselClient;
