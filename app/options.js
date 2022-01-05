// writefile
async function writeFileToothWarrior(fileHandle, contents) {
    // writable作成
    const writable = await fileHandle.createWritable();
    // コンテンツを書き込む
    await writable.write(contents);
    // ファイル閉じる
    await writable.close();
}
// savefile
async function saveFileToothWarrior(fileHandle, contents, saveFileOptions) {
    if(!fileHandle) {
        fileHandle = await window.showSaveFilePicker(saveFileOptions);
    }
    await writeFileToothWarrior(fileHandle, contents);
    return fileHandle;
}

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
            // sites.xml
            let sitesList = '';
            for (const actUrl of actionUrlArray) {
                sitesList += `
    <site url="${actUrl}">
        <compat-mode>IE11Enterprise</compat-mode>
        <open-in>IE11</open-in>
    </site>`;
            }
            const textContent = `<site-list version="2">
    <created-by>
        <tool>EMIESiteListManager</tool>
        <version>10.0.14357.1004</version>
        <date-created>01/17/2020 00:00:00</date-created>
    </created-by>
${sitesList}
</site-list>
`;
            const saveFileOptions = {
                types: [
                    {
                        description: 'xml file',
                        accept: {
                            'text/xml': [
                                '.xml'
                            ],
                        },
                    },
                ],
            };
            let globalHandle;
            // savefile
            globalHandle = saveFileToothWarrior(globalHandle, textContent, saveFileOptions);
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
