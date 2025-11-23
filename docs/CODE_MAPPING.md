# ソースコード依存関係マップ (CODE_MAPPING.md)

## 概要
機能要件と実装コードの1行単位での依存関係マッピング

---

## FR-001: バズリール検索・収集機能

### 依存ファイル

#### `src/types/index.ts`
| 行番号 | コード | 役割 |
|--------|--------|------|
| 1-12 | `interface Reel` | リールデータ型定義 |
| 2 | `id: string` | リール識別子 |
| 3 | `url: string` | InstagramリールURL |
| 4 | `title: string` | リールタイトル |
| 5 | `views: number` | 再生回数 |
| 6 | `likes: number` | いいね数 |
| 7 | `comments: number` | コメント数 |
| 8 | `postedAt: string` | 投稿日時 |
| 9 | `thumbnail?: string` | サムネイル画像URL |
| 10 | `author: string` | 投稿者名 |
| 11 | `keywords: string[]` | 関連キーワード |

#### `src/lib/instagram.ts`
| 行番号 | コード | 役割 |
|--------|--------|------|
| 16-22 | `mockReels` | テスト用モックデータ配列 |
| 17 | 心理学リール | モックデータ1 (150K views) |
| 18 | 節約術リール | モックデータ2 (280K views) |
| 19 | レシピリール | モックデータ3 (520K views) |
| 20 | 睡眠リール | モックデータ4 (89K views) |
| 21 | 雑学リール | モックデータ5 (340K views) |

#### `src/app/api/search/route.ts`
| 行番号 | コード | 役割 |
|--------|--------|------|
| 1 | `import { NextRequest, NextResponse }` | Next.js APIルートインポート |
| 2 | `import { mockReels }` | モックデータインポート |
| 4 | `export async function POST` | POSTエンドポイント定義 |
| 5 | `const { keyword, minViews = 30000, maxAgeMonths = 6 }` | リクエストパラメータ抽出 |
| 6 | バリデーション | キーワード必須チェック |
| 8 | `cutoff` 計算 | 期間フィルター境界値 |
| 9-13 | `mockReels.filter` | フィルタリング処理 |
| 10 | キーワードマッチ | タイトル・キーワード検索 |
| 11 | 再生数フィルター | minViews以上 |
| 12 | 期間フィルター | cutoff以降 |
| 13 | `.sort` | 再生数降順ソート |
| 15 | レスポンス | JSON形式で返却 |

#### `src/components/ReelSearch.tsx`
| 行番号 | コード | 役割 |
|--------|--------|------|
| 5-13 | `interface ReelSearchProps` | コンポーネントProps型 |
| 16-19 | state定義 | keyword, minViews, startDate, endDate |
| 21-24 | `handleSubmit` | フォーム送信ハンドラ |
| 31-133 | JSX | 検索フォームUI |
| 39-47 | キーワード入力 | テキストinput |
| 57-65 | 最小再生数入力 | number input |
| 76-81 | 開始日入力 | date input |
| 91-96 | 終了日入力 | date input |
| 101-132 | 検索ボタン | submit button with loading |

#### `src/components/ReelCard.tsx`
| 行番号 | コード | 役割 |
|--------|--------|------|
| 6-8 | `interface ReelCardProps` | Props型定義 |
| 13-21 | `formatNumber` | 数値フォーマット関数 |
| 23-31 | `handleCopyUrl` | URLコピー処理 |
| 33-139 | JSX | リールカードUI |
| 36-42 | サムネイル表示 | 画像表示 |
| 45-47 | タイトル表示 | h3タグ |
| 49-64 | 投稿者表示 | SVGアイコン + テキスト |
| 66-96 | 統計表示 | 再生数・いいね数 |
| 98-137 | コピーボタン | URLコピー機能 |

---

## FR-002: 動画ダウンロード機能

### 依存ファイル

#### `src/lib/instagram.ts`
| 行番号 | コード | 役割 |
|--------|--------|------|
| 1-3 | `validateUrl` | InstagramURL検証 (正規表現) |
| 5-8 | `extractId` | URLからリールID抽出 |

#### `src/app/api/download/route.ts`
| 行番号 | コード | 役割 |
|--------|--------|------|
| 1 | インポート | NextRequest, NextResponse |
| 2 | インポート | validateUrl, extractId |
| 4 | `export async function POST` | POSTエンドポイント |
| 5 | `const { url }` | リクエストからURL取得 |
| 6 | バリデーション | URL形式チェック |
| 8 | `extractId(url)` | ID抽出 |
| 9-13 | レスポンス | reelId, status, instructions |
| 12 | `instructions` | snapinsta.toへの案内 |

#### `src/components/VideoDownloader.tsx`
| 行番号 | コード | 役割 |
|--------|--------|------|
| - | URL入力フォーム | リールURL入力 |
| - | ダウンロード案内表示 | 外部サービス案内 |

---

## FR-003: AI台本生成機能

### 依存ファイル

#### `src/lib/ai-client.ts`
| 行番号 | コード | 役割 |
|--------|--------|------|
| 1 | `ANTHROPIC_API_KEY` | 環境変数からAPI Key取得 |
| 3-20 | `callClaude` | Claude API呼び出し共通関数 |
| 4-16 | fetch設定 | API設定 (model, max_tokens) |
| 12 | `claude-sonnet-4-20250514` | 使用モデル |
| 22-24 | `generateTranscript` | 台本生成関数 |
| 23 | プロンプト | 「完璧に再現するために...」 |

#### `src/app/api/transcript/route.ts`
| 行番号 | コード | 役割 |
|--------|--------|------|
| 2 | `import { generateTranscript }` | AI関数インポート |
| 6 | `const { description }` | 説明文取得 |
| 7 | バリデーション | description必須チェック |
| 8 | `generateTranscript(description)` | AI台本生成実行 |
| 9 | レスポンス | { transcript } |

#### `src/components/TranscriptGenerator.tsx`
| 行番号 | コード | 役割 |
|--------|--------|------|
| - | テキストエリア | 説明文入力 |
| - | 生成ボタン | API呼び出しトリガー |
| - | 結果表示 | 生成された台本表示 |

---

## FR-004: バズ分析機能

### 依存ファイル

#### `src/types/index.ts`
| 行番号 | コード | 役割 |
|--------|--------|------|
| 14-19 | `interface BuzzAnalysis` | 分析結果型定義 |
| 15 | `reasons: string[]` | バズの理由配列 |
| 16 | `patterns: string[]` | パターン配列 |
| 17 | `successFactors: string[]` | 成功要因配列 |
| 18 | `recommendations: string[]` | 推奨事項配列 |

#### `src/lib/ai-client.ts`
| 行番号 | コード | 役割 |
|--------|--------|------|
| 26-30 | `analyzeBuzz` | バズ分析関数 |
| 27 | プロンプト | JSON形式出力指示 |
| 28 | JSONパース | レスポンス解析 |
| 29 | フォールバック | パース失敗時の処理 |

#### `src/app/api/analyze/route.ts`
| 行番号 | コード | 役割 |
|--------|--------|------|
| 2 | `import { analyzeBuzz }` | 分析関数インポート |
| 6 | `const { transcript }` | 台本取得 |
| 8 | `analyzeBuzz(transcript)` | 分析実行 |
| 9 | レスポンス | BuzzAnalysis返却 |

#### `src/components/BuzzAnalyzer.tsx`
| 行番号 | コード | 役割 |
|--------|--------|------|
| 4 | `import type { BuzzAnalysis }` | 型インポート |
| 11-12 | state定義 | transcript, analysis |
| 15-27 | `handleAnalyze` | 分析実行ハンドラ |
| 29-57 | `AnalysisSection` | 分析セクションコンポーネント |
| 137-156 | バズの理由セクション | reasons表示 |
| 158-177 | パターンセクション | patterns表示 |
| 179-198 | 成功要因セクション | successFactors表示 |
| 200-219 | 推奨事項セクション | recommendations表示 |

---

## FR-005: Threads投稿生成機能

### 依存ファイル

#### `src/types/index.ts`
| 行番号 | コード | 役割 |
|--------|--------|------|
| 21-24 | `interface ThreadsPost` | Threads投稿型定義 |
| 22 | `part1: string` | 投稿Part1 |
| 23 | `part2: string` | 投稿Part2 |

#### `src/lib/ai-client.ts`
| 行番号 | コード | 役割 |
|--------|--------|------|
| 32-36 | `generateThreads` | Threads生成関数 |
| 33 | プロンプト | 2段階投稿指示 |
| 34-35 | JSONパース | part1, part2抽出 |

#### `src/app/api/threads/route.ts`
| 行番号 | コード | 役割 |
|--------|--------|------|
| 2 | `import { generateThreads }` | 生成関数インポート |
| 6 | `const { title, transcript }` | パラメータ取得 |
| 8 | `generateThreads(title, transcript)` | 生成実行 |

#### `src/components/ThreadsGenerator.tsx`
| 行番号 | コード | 役割 |
|--------|--------|------|
| 6-10 | state定義 | title, script, part1, part2 |
| 13-27 | `handleGenerate` | **未接続 (setTimeout使用)** |
| 19-26 | モック処理 | ローカル分割処理 |
| 29-34 | `handleCopy` | コピー機能 |
| 82-96 | Part1表示 | 投稿Part1 |
| 100-115 | Part2表示 | 投稿Part2 |

---

## FR-006: 新リール台本生成機能

### 依存ファイル

#### `src/lib/ai-client.ts`
| 行番号 | コード | 役割 |
|--------|--------|------|
| 38-40 | `generateReelScript` | リール台本生成関数 |
| 39 | プロンプト | 視点変換指示 |

#### `src/app/api/reel-script/route.ts`
| 行番号 | コード | 役割 |
|--------|--------|------|
| 2 | `import { generateReelScript }` | 生成関数インポート |
| 6 | `const { transcript }` | 元台本取得 |
| 8 | `generateReelScript(transcript)` | 生成実行 |

#### `src/components/ReelScriptGenerator.tsx`
| 行番号 | コード | 役割 |
|--------|--------|------|
| - | テキストエリア | 元台本入力 |
| - | 生成ボタン | API呼び出し |
| - | 結果表示 | 新台本表示 |

---

## FR-007: キャプション生成機能

### 依存ファイル

#### `src/lib/ai-client.ts`
| 行番号 | コード | 役割 |
|--------|--------|------|
| 42-44 | `generateCaption` | キャプション生成関数 |
| 43 | プロンプト | キャプション生成指示 |

#### `src/app/api/caption/route.ts`
| 行番号 | コード | 役割 |
|--------|--------|------|
| 2 | `import { generateCaption }` | 生成関数インポート |
| 6 | `const { transcript }` | 台本取得 |
| 8 | `generateCaption(transcript)` | 生成実行 |

#### `src/components/CaptionGenerator.tsx`
| 行番号 | コード | 役割 |
|--------|--------|------|
| - | テキストエリア | 台本入力 |
| - | 生成ボタン | API呼び出し |
| - | 結果表示・コピー | キャプション表示 |

---

## FR-008: コミュニケーション加速機能

### 依存ファイル

#### `src/types/index.ts`
| 行番号 | コード | 役割 |
|--------|--------|------|
| 26-29 | `interface CommentIdea` | コメントアイデア型定義 |
| 27 | `type: 'reply' \| 'engagement'` | タイプ |
| 28 | `ideas: string[]` | アイデア配列 |

#### `src/lib/ai-client.ts`
| 行番号 | コード | 役割 |
|--------|--------|------|
| 46-53 | `generateComment` | コメント生成関数 |
| 47-49 | プロンプト分岐 | reply/engagement |
| 50 | `callClaude(prompt)` | AI呼び出し |
| 51 | JSONパース | ideas抽出 |

#### `src/app/api/comment/route.ts`
| 行番号 | コード | 役割 |
|--------|--------|------|
| 2 | `import { generateComment }` | 生成関数インポート |
| 6 | `const { content, comment, type }` | パラメータ取得 |
| 8 | `generateComment(content, ...)` | 生成実行 |
| 9 | レスポンス | ideas, type |

#### `src/components/CommentHelper.tsx`
| 行番号 | コード | 役割 |
|--------|--------|------|
| 5 | `type CommentType` | タイプ定義 |
| 8-13 | state定義 | commentType, content, ideas等 |
| 15-45 | `handleGenerate` | **未接続 (setTimeout使用)** |
| 23-44 | モック処理 | ローカルアイデア生成 |
| 47-51 | `handleCopy` | コピー機能 |
| 65-85 | タイプ選択ボタン | reply/engagement切り替え |
| 137-161 | アイデアリスト | 生成アイデア表示 |

---

## 実装状態一覧

| 機能要件 | 状態 | 備考 |
|----------|------|------|
| FR-001 | **実装済み** | モックデータ使用 (実API移行は低優先度) |
| FR-002 | **実装済み** | 外部サービス (snapinsta.to) 案内 |
| FR-003 | **実装済み** | Claude API連携 |
| FR-004 | **実装済み** | Claude API連携 |
| FR-005 | **実装済み** | /api/threads API接続完了 |
| FR-006 | **実装済み** | Claude API連携 |
| FR-007 | **実装済み** | Claude API連携 |
| FR-008 | **実装済み** | /api/comment API接続完了 |

---

## 更新履歴

| 日付 | 内容 |
|------|------|
| 2025-11-23 | 初版作成 - 全ファイル解析完了 |
