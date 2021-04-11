// content script (background.js) からメッセージが渡されて実行
chrome.runtime.onMessage.addListener(
    function(
        request,
        sender,
        sendResponse
    ) {
        try {
            // 新規タブを開き、拡張機能ページを表示 (メッセージで渡された URL を GETパラメータにセット)
            chrome.tabs.create(
                {
                    url: `app/index.html?transi=${request.args}`
                }
            );
            // レスポンス返却
            sendResponse(
                {
                    return: true,
                    msg:    'OK.'
                }
            );
        } catch (error) {
            // レスポンス返却
            sendResponse(
                {
                    return: false,
                    msg:    error
                }
            );
        }
    }
);
