// Saves options to chrome.storage
const disperseSkeleton = () => {
    const pageUrl = document.querySelector('#pageUrl').value;
    const actionUrl = document.querySelector('#actionUrl').value;
    let actionUrlArray = actionUrl.split('\n');
    actionUrlArray = actionUrlArray.filter(function(val){
        return val.length !== 0;
    });
    chrome.storage.local.set(
        {
            pageUrl: pageUrl,
            actionUrl: JSON.stringify(actionUrlArray)
        },
        function() {
            const status = document.querySelector('#c-saveMsg');
            status.textContent = '保存されました';
        }
    );
};

// stored in chrome.storage.
const constructSkeleton = () => {
    const defaultData = {
        pageUrl: 'example.com',
        actionUrl: '["example.jp","example.co.jp","example.or.jp","example.ac.jp","example.go.jp","example.org"]'
    };
    chrome.storage.local.get(
        defaultData,
        function (items) {
            if (
                chrome.runtime.error
            ) {
                console.log(`Error: ${chrome.runtime.error}`);
            }
            else {
                document.querySelector('#pageUrl').value = items.pageUrl;
                document.querySelector('#actionUrl').value = JSON.parse(items.actionUrl).join('\n');
            }
        }
    );
};

const main = () => {
    constructSkeleton();
    const $btnSave = document.querySelector('#c-btnSave');
    $btnSave.addEventListener('click', function () {
        disperseSkeleton();
    });
};

document.addEventListener('DOMContentLoaded', main());
