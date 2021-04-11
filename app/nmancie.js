const revenant = () => {
    // 表示している URL を取得
    const url = new URL(window.location.href);
    // パラメータオブジェクト取得
    const params = url.searchParams;
    const msgBox = document.querySelector('#c-msg_txt-result');
    if (
        params.get('transi') !== null
        && params.get('transi') !== undefined
        && params.get('transi').length > 0
    ) {
        // native host にメッセージ送信
        chrome.runtime.sendNativeMessage(
            'transi.nmancie.revenant',
            {
                'args': params.get('transi')
            },
            (responseFromNativeHost) => {
                if (
                    chrome.runtime.lastError !== undefined
                    && chrome.runtime.lastError !== null
                ) {
                    console.error(chrome.runtime.lastError.message);
                    msgBox.textContent = chrome.runtime.lastError.message;
                }
                else if (
                    responseFromNativeHost !== undefined
                    && responseFromNativeHost !== null
                    && responseFromNativeHost.message !== 'ok'
                ) {
                    console.log(`Error occured: ${responseFromNativeHost.message}`);
                    msgBox.textContent = `Error occured: ${responseFromNativeHost.message}`;
                }
                else {
                    console.log(`done: ${responseFromNativeHost.message}`);
                    msgBox.textContent = `done: ${responseFromNativeHost.message}`;
                    // IE を開くことに成功したら、自身のタブを閉じる
                    chrome.tabs.getCurrent(function (tab) {
                        chrome.tabs.remove(tab.id);
                    });
                }
            }
        );
    }
}

document.addEventListener('DOMContentLoaded', revenant());
