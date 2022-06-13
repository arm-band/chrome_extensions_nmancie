// d-man works
const zombie = (powder) => {
    if (location.href.indexOf(powder.pageUrl) !== -1) {
        // only act in certain page
        console.log('transi')
        const elements = document.querySelectorAll('a');
        for (var i = 0; i < elements.length; i++) {
            // check all link
            elements[i].onclick = function (e) {
                if(
                    typeof e.target !== 'undefined'
                    && e.target !== null
                ) {
                    let targetLink;
                    if(
                        e.target.hasAttribute('href')
                        && typeof e.target.href !== 'undefined'
                        && e.target.href !== null
                    ) {
                        // href がある場合は自身
                        targetLink = e.target;
                    }
                    else {
                        // href がない場合は直近の祖先要素
                        targetLink = e.target.closest('a');
                    }

                    for (const actUrl of powder.actionUrl) {
                        if (targetLink.href.indexOf(actUrl) !== -1) {
                            e.preventDefault();

//                                    console.log(chrome.runtime.getManifest())
//                                    console.log("" + Object.getOwnPropertyNames(chrome.runtime));
                            // content script (this) -> event page (transi.js)
                            // chrome.tabs は content script ではアクセスできず、 event page からしかアクセスできないので sendMessage で受け渡す
                            chrome.runtime.sendMessage(
                                {
                                    args: targetLink.href
                                },
                                function (response) {
                                // メッセージリッスンが終わった後に実行
                                const msg = `${response.return ? 'done' : 'failed'}: ${response.msg}`;
                                console.log(msg);
                            });
                        }
                    }
                }
            };
        }
    }
};

// they call d-man
const bokor = () => {
    let powder = {
        pageUrl: 'example.com',
        actionUrl: [
            'example.jp',
            'example.co.jp',
            'example.or.jp',
            'example.ac.jp',
            'example.go.jp',
            'example.org'
        ]
    };
    // default options
    let defaultPowder = powder;
    defaultPowder.actionUrl = JSON.stringify(powder.actionUrl);
    // get options
    chrome.storage.local.get(
        defaultPowder,
        function (items) {
            if (
                chrome.runtime.error
            ) {
                console.log(`Error: ${chrome.runtime.error}`);
            }
            else {
                powder.pageUrl = items.pageUrl;
                powder.actionUrl = JSON.parse(items.actionUrl);
                const qualia = document.querySelector('#root');
                if (qualia !== null && qualia !== undefined) {
                    // React app
                    const bioelectricalSignaling = {
                        childList: true,
                        subtree: true
                    };
                    const LeibnizsWindmill = new MutationObserver (function (mutations) {
                        //監視を一時停止
                        LeibnizsWindmill.disconnect();
                        // call action with options
                        zombie(powder);
                        //監視を再開
                        LeibnizsWindmill.observe(qualia, bioelectricalSignaling);
                    });
                    LeibnizsWindmill.observe(
                        qualia,
                        bioelectricalSignaling
                    );
                }
                else {
                    // not React app
                    // call action with options
                    zombie(powder);
                }
            }
        }
    );
};

document.addEventListener('DOMContentLoaded', bokor());
