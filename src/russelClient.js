import {
    checkConnection,
    clearCluster,
    deleteCluster,
    getAllClusters,
    getCluster,
    getKeysOfCluster,
    setCluster,
    setKey
} from "./endPoints.js";

class ApiResponse {
    constructor(isSuccess, data) {
        this.isSuccess = isSuccess;
        this.data = data;
    }

    static fromDict(data) {
        return new ApiResponse(data.is_success, data.data);
    }

    decodeData() {
        if (Array.isArray(this.data)) {
            return Buffer.from(this.data).toString('utf-8');
        }
        return this.data;
    }
}

class RusselClient {
    constructor() {
        this.baseUrl = 'http://127.0.0.1:6006/api';
    }

    async setRusselConfig(russelConfig) {
        this.baseUrl = russelConfig.baseUrl + '/api'
    }

    async _handleResponse(response) {
        if (!response.is_success) {
            throw new Error(response.data || "Unknown error");
        } else {

            return ApiResponse.fromDict(response);

        }
    }

    async set(payload) {
        const response = await setKey(this.baseUrl, payload)
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
        const url = `${this.baseUrl}/api/get_clusters`;
        const response = await getAllClusters(url);
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

export default RusselClient

