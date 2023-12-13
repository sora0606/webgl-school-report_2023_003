# 【WebGL School 2023】 課題 003

次のツールを採用しています:

- [vite](https://ja.vitejs.dev/): ウェブサイト構築のためのフレームワーク
- [Tailwind CSS](https://tailwindcss.com/): ユーティリティファーストCSSフレームワーク
- [Alpine.js](https://alpinejs.dev/): HTML上に直接振る舞いを記述できるJavaScriptフレームワーク

## 開発用コマンド
依存パッケージのインストール:

```bash
npm ci
```

ローカルサーバーの起動:

```bash
npm run dev
```

本番用ビルド:

```bash
npm run build
```

プレビューサーバーの起動:

```bash
npm run preview
```

## ファイル構成

```
.
├── public/             # ビルドによって加工されないアセット
├── src/                # メインのソースコード
│   ├── components/     # TypeScriptコンポーネント
│   └── main.ts         # AlpineJSで読み込まれるメインのTSファイル
│   └── styles.css      # Tailwind CSSで読み込まれるCSSファイル
├── package.json        # 依存パッケージを管理するための設定
├── postcss.config.cjs  # PostCSSの設定
├── tailwind.config.cjs # Tailwind CSSの設定
├── tailwind.config.cjs # Tailwind CSSの設定
└── tsconfig.json       # TypeScriptの設定
└── vite.config.js      # Viteの設定
```
