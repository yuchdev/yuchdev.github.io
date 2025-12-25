// noinspection JSUnusedGlobalSymbols,JSUnresolvedReference

/**
 * Mock the document and window objects for Node.js
 *
 * @type {import('jest-fetch-mock').MockedResponse}
 */
global.document = {
    getElementById: (id) => {
        if (id === "contact-form") {
            return {
                addEventListener: () => {},
                elements: {
                    namedItem: () => ({ value: 'test' })
                },
                reset: () => {}
            };
        }
        return { textContent: '', style: { color: '' } };
    },
};

global.window = {
    CONTACT_BACKEND_URL: 'https://example.com',
    CONTACT_BACKEND_SECRET_B64: 'U29tZVNlY3JldA==', // Base64 for "SomeSecret"
    location: { protocol: 'file:', hostname: '' },
};

/**
 * Validates an email address.
 *
 * @param {string} email - The email address to validate.
 * @returns {boolean} True if the email is valid, false otherwise.
 */
const {
    decodeBase64Utf8,
    setStatus,
    basicEmailOk,
    isLocal,
    showFallback,
    postJson
} = require('../js/contact');

/**
 * Runs all tests.
 * @returns {Promise<void>}
 */
async function runTests() {
    console.log('Running tests...');

    // Test decodeBase64Utf8
    try {
        console.log('Test decodeBase64Utf8:', decodeBase64Utf8('SGVsbG8gd29ybGQ=') === 'Hello world' ? 'Passed' : 'Failed');
    } catch (error) {
        console.error('decodeBase64Utf8 test failed:', error);
    }

    // Test setStatus (mock DOM element)
    const mockStatusEl = { textContent: '', style: { color: '' } };
    global.document.getElementById = () => mockStatusEl;
    setStatus('Test message', true);
    console.log('Test setStatus:', mockStatusEl.textContent === 'Test message' && mockStatusEl.style.color === '#b42318' ? 'Passed' : 'Failed');

    // Test basicEmailOk
    console.log('Test basicEmailOk (valid):', basicEmailOk('test@example.com') ? 'Passed' : 'Failed');
    console.log('Test basicEmailOk (invalid):', !basicEmailOk('invalid-email') ? 'Passed' : 'Failed');

    // Test isLocal
    console.log('Test isLocal (file protocol):', isLocal() ? 'Passed' : 'Failed');

    // Test showFallback (mock DOM element)
    global.form = { elements: { namedItem: () => ({ value: 'test' }) } };
    showFallback('Test reason');
    console.log('Test showFallback: Check console for fallback message');

    // Test postJson (mock fetch)
    global.fetch = async () => ({
        ok: true,
        headers: {
            get: () => "application/json"
        },
        json: async () => ({ status: "ok" })
    });
    const response = await postJson('https://example.com', { key: 'value' });
    console.log('Test postJson:', response.res.ok ? 'Passed' : 'Failed');

    console.log('All tests completed.');
}

// Run tests
runTests().then(r => r).catch(err => console.error('Error running tests:', err));
