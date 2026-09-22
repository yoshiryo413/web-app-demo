# web-app-demo

HTML / CSS / バニラ JavaScript で作ったシンプルな Todo アプリです。

## 使い方

`index.html` をブラウザで開くだけで動きます（ビルド・サーバー不要）。

```
open index.html          # macOS
xdg-open index.html      # Linux
```

## 機能

- タスクの追加 / 完了トグル / 削除
- フィルタ（すべて・未完了・完了）
- 完了タスクの一括削除
- localStorage による保存（リロードしても残る）

## ファイル構成

| ファイル | 役割 |
| --- | --- |
| `index.html` | マークアップ |
| `style.css` | スタイル（レスポンシブ対応） |
| `script.js` | 追加・削除・フィルタ・保存のロジック |
