 class ServiceResult {
    private message;
    private data;

    constructor(message: string, data) {
    this.message = message
    this.data = data
}

ok() {
    return {
        is_success: true,
        data: this.data,
        message: this.message

    }
}

failure() {
    return {
        is_success: false,
        data: null,
        message: this.message

    }
}
}
