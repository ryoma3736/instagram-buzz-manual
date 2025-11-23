# セットアップガイド

## 前提条件
- Node.js 20+
- Docker Desktop (インストール: https://www.docker.com/products/docker-desktop/)

## クイックスタート

### 1. Docker Desktopをインストール・起動
```bash
# macOS
brew install --cask docker
# または公式サイトからダウンロード
```

### 2. 環境変数設定
```bash
cp .env.example .env
# .envファイルを編集してANTHROPIC_API_KEYを設定
```

### 3. データベース起動
```bash
docker compose up -d db
```

### 4. Prismaマイグレーション
```bash
npx prisma migrate dev --name init
```

### 5. アプリ起動
```bash
npm run dev
```

### 6. アクセス
http://localhost:3000

---

## Docker全体起動 (本番環境)

```bash
docker compose up -d
```

これでPostgreSQL + Next.jsアプリが起動します。

---

## データベース接続情報

| 項目 | 値 |
|------|------|
| Host | localhost |
| Port | 5432 |
| User | postgres |
| Password | postgres |
| Database | instagram_buzz |

---

## Prismaコマンド

```bash
# スキーマ変更後
npx prisma migrate dev --name <migration_name>

# クライアント再生成
npx prisma generate

# DBブラウザ起動
npx prisma studio
```

---

## トラブルシューティング

### Dockerが見つからない
```bash
# Docker Desktopをインストール・起動してください
open -a Docker
```

### ポート5432が使用中
```bash
# 既存のPostgreSQLを停止
brew services stop postgresql
```
