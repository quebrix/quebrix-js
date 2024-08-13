import RusselClient from "../src/russelClient.js";
async function main() {
    const testClient = new RusselClient();

    try {
        const payload = {
            cluster: 'newTest',
            key: 'testNew2',
            value: 'helloWorld',
        }
        const partials = {
            cluster: 'newTest',
            key: 'testNew2',
        }
        const setResponse = await testClient.set(payload);
        console.log("Set Response:", setResponse.isSuccess);

        const getResponse = await testClient.getKeysOfCluster('newTest');
        console.log("Decoded Value:", getResponse.data);
        // const response = await testClient.getKeysOfCluster(partails);
        // console.log("Raw Value:", response.data);
        // const decodedValue = response.decodeData();
        // console.log("Decoded Value:", decodedValue);
    }
    catch (error) {
        console.error("Error:", error.message);
    }
}

// Run the main function
main();
