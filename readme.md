# N-mancie

## Abstract

特定のWebページ内の特定の URL を開くときのみ、 Internet Explorer で該当 URL を開き直す Chrome拡張機能 です。

## Usage

1. `nmancie.zip` をダウンロード
2. `nmancie.zip` を任意のフォルダで展開 (インストール後はディレクトリ移動は不可なので注意してください)
3. Chrome の拡張機能画面からインストール
    - デベロッパーモードをオンにして、「パッケージ化されていない拡張機能を読み込む」から2.のディレクトリを指定
4. Chrome の拡張機能画面で ID を控える
5. `nmancie`ディレクトリ 中の `host`下 にある `revenant.json` の `"chrome-extension://xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx/"` 、`xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx` の部分を4.で控えた ID に書き換える
6. `nmancie`ディレクトリ 中の `host`下 にある `register-host.bat` を実行

## Settings

1. Chrome の拡張機能画面から N-mancieの「詳細」ボタンをクリック
2. 「拡張機能のオプション」をクリック
3. 「ページURL」と「IE で開き直す URL」を指定してください