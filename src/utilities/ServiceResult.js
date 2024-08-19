export class ServiceResult {
     message;
     data;

    constructor(message, data) {
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
