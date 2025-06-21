#卒業作品
#不動産地雷探し - 地方アドレス別コミュニティサイト（React + Spring Boot）

## 概要  
本プロジェクト「不動産地雷探し（仮）」は、一般的な不動産アプリに掲載されているレビューと、実際に住んでいる人々の体験・意見との間に大きなギャップがあるという問題意識から出発しました。  
多くのレビューは企業や管理会社によってフィルタリングされており、実際の居住者のネガティブな声が反映されにくい現状を改善するため、  
「現地の声」にフォーカスした掲示板型コミュニティサイトとして開発されました。
ユーザーは建物の住所単位でスレッドに参加でき、匿名で投稿・意見交換が可能です。
React（フロントエンド）と Spring Boot（バックエンド）を基盤とした、地方アドレス単位の掲示板コミュニティサイトです。  
ユーザーはマンションやオフィステルなどの「住所」に基づく掲示板に参加し、ログイン後に投稿の作成・閲覧・編集・削除（CRUD）が可能です。  
JWTベースの認証と保護されたルート設計により、ユーザーの権限管理が実現されています。


### 教授からのフィードバック  
プロジェクト名「地雷探し」にちなみ、将来的には投稿された内容と、既存の不動産レビューを自動比較し、ギャップが大きい物件を「地雷物件」としてマークするような機能を追加するのも良いのでは、という助言をいただきました。


## 主な機能  
- 会員登録 / ログイン / ログアウト（JWTトークン認証）  
- 地方アドレス別の掲示板一覧と投稿の表示  
- 投稿の作成・閲覧・編集・削除（本人のみ可能）  
- 画像アップロード（FormData + Spring Multipart 対応）  
- 投稿の検索・フィルター・ページング（作成者やキーワード）  
- 認証されたルートの保護（React Router + Spring Security）

## 使用技術スタック  

### バックエンド  
- Java 23 (Gradle Toolchain)  
- Spring Boot 3.3.4  
  - spring-boot-starter-web  
  - spring-boot-starter-data-jpa（Hibernate）  
  - spring-boot-starter-security（JWTフィルター）  
  - spring-boot-devtools  
- JWT（jjwt-api / jjwt-impl / jjwt-jackson）  
- MySQL  
- Lombok / Jackson / JUnit（テスト）  
- Gradle（Groovy DSL）

### フロントエンド  
- React ^18.3.1  
- Vite ^5.4.1 + @vitejs/plugin-react  
- Redux Toolkit + react-redux  
- redux-thunk / redux-persist（transform-filter含む）  
- React Router DOM ^6.26.2  
- react-table, prop-types  
- ESLint / Prettier  

### その他  
- Git  
- Docker（任意）  
- ngrok / Vercel（ホスティング例）  


## プロジェクト構成

project-root/  
├── backend/  
│   ├── build.gradle  
│   └── src/main/java/com/inside/realty_inside_1002/  
│       ├── config/                        # セキュリティ設定（JWT含む）  
│       ├── controller/                    # 認証・投稿・掲示板API  
│       ├── domain/                        # エンティティ（User, Board, Post）  
│       ├── dto/                           # リクエスト/レスポンスDTO  
│       ├── repository/                    # JPAリポジトリ  
│       └── service/                       # ビジネスロジック  
├── frontend/  
│   ├── package.json  
│   └── src/  
│       ├── components/  
│       │   ├── board/                     # 掲示板UI  
│       │   └── common/                    # 共通UI（ボタン・モーダルなど）  
│       ├── store/                         # Redux storeとslice  
│       ├── App.jsx                        # ルーティング設定  
│       └── index.jsx                      # エントリーポイント  

