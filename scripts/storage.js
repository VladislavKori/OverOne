const saveInStorage = (key, value) => {
    chrome.storage.local.set({
        key: value
    }).then(() => {
        console.log("Value is set");
    });
}

const getFromStorage = (key, value) => {
    chrome.storage.local.get(["key"]).then((result) => {
        console.log("Value currently is " + result.key);
    });
}