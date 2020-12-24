---
id: 265
title: remarkでnuxt/contentのマークダウン書式を拡張する
created_at: 2020-12-13
updated_at: 2020-12-19
isDraft: false
tags: Nuxtjs,Vuejs,TypeScript,JavaScript
top_image: /icons/nuxt.svg
---

nuxt/contentで作ったサイトに絵文字や数式のプラグインを追加して、マークダウンの書式を拡張します。
nuxt/contentを使っていなくても、remarkのプラグイン選びの参考にはなるかと思います。

## Table of Contents

## マークダウンのプラグイン
[markdown - @nuxt/contet](https://content.nuxtjs.org/configuration#markdown)

@nuxt/contentでは[remark](https://www.npmjs.com/package/remark)というプラグインでマークダウンの構文を解析しています。
HTMLへのパースは[remark-html](https://github.com/remarkjs/remark-html)を使ったりと、マークダウンを拡張する`remark-*`の豊富なエコシステムがあります。
目的に応じて役割ごとに細かなプラグインを組み合わせて扱うことができる。

`yarn` または `npm` でプラグインをインストールして**nuxt.config.js**に追加するだけで利用できます。
下はここで使っている絵文字や数式（$\KaTeX$）のプラグインを追加したところです。
コードを書かなくてよいので管理しやすい。

```js:nuxt.config.js
export default {
  // Content module configuration (https://go.nuxtjs.dev/config-content)
  content: {
    markdown: {
      remarkPlugins: [
        'remark-emoji',
        'remark-math',
        'remark-toc',
        'remark-footnotes',
        'remark-code-titles'
      ],
      rehypePlugins: [
        'rehype-katex'
      ]
    }
  },
}
```
２つのpuluginがあります。
`remark`はMarkdownの構文を解析するプロセッサで、`rehype`がHTMLを構築するプロセッサです。
例えば、`remark-math`がMarkdownの構造を解析して`rehype-katex`が$\KaTeX$に対応するHTMLに変換している。
`remark-emoji`のように単体で両方こなすものもある。

remarkについて読み応えのある熱い記事を見つけたので載せておきます。独自のParserの拡張の仕方も載ってます。
- [Remark で広げる Markdown の世界](https://vivliostyle.github.io/vivliostyle_doc/ja/vivliostyle-user-group-vol2/spring-raining/index.html)

---

以下からremarkの拡張プラグインを紹介していきます。
利用できる公式オススメのプラグインは[awesome-remark](https://github.com/remarkjs/awesome-remark)にまとまってます。  

## 絵文字

[remark-emoji](https://github.com/rhysd/remark-emoji)

```sh
# インストール
$ yarn add remark-emoji
```
**nuxt.config.js**の`content.markdown.remarkPlugins`に`remark-emoji`を追加する。
これでパースできるようになっています。

マークダウンの中の対応する文字を絵文字に変換してくれます。
```txt:入力
Emojis in this text will be replaced: :dog: :+1:

Toilet Time
:toilet: = 2 Minutes
:toilet: + :iphone: = 5 Minutes
:toilet: + :iphone: + ⁣:signal_strength: = 10 Minutes
:toilet: + :iphone: + :signal_strength: + :battery: = Infinite 
```

▼**出力結果**（引用符で囲ってます）
> 
> Emojis in this text will be replaced: :dog: :+1:
> 
> 
> Toilet Time  
> :toilet: = 2 Minutes  
> :toilet: + :iphone: = 5 Minutes  
> :toilet: + :iphone: + ⁣:signal_strength: = 10 Minutes  
> :toilet: + :iphone: + :signal_strength: + :battery: = Infinite   

[EMOJI CHEAT SHEET](https://www.webfx.com/tools/emoji-cheat-sheet/)の絵文字のコードは使えるはずです。

## 数式

数式に対応する`remarkPlugins`が[remark-math](https://github.com/remarkjs/remark-math)です。
数式を`$$`で囲うか、文中の場合は`$`で囲います。


対応する`rehype`には$\KaTeX$と**MathJax**があります。
- [rehype-katex](https://github.com/remarkjs/remark-math/blob/main/packages/rehype-katex)
- [rehype-mathjax](https://github.com/remarkjs/remark-math/blob/main/packages/rehype-mathjax)

どちらもLaTeXですが、HTMLの描画方法が少し違います。
個人的には描画速度が早くてKaTeXを選んでます。

```sh
# インストール
$ yarn add remark-emoji
```
**nuxt.config.js**の`content.markdown.remarkPlugins`に`remark-math`を、`rehypePlugins`に`rehype-katex`を追加する。
そして、表示のために$\KaTeX$のスタイルシートも当てます。
```js
export default {
    link: [
      // Add style sheet
      {
        rel: 'stylesheet',
        href: 'https://cdn.jsdelivr.net/npm/katex@0.11.0/dist/katex.min.css'
      },
    ],
  },

  // Content module configuration (https://go.nuxtjs.dev/config-content)
  content: {
    markdown: {
      remarkPlugins: [
        'remark-math'
      ],
      rehypePlugins: [
        'rehype-katex'
      ]
    }
  },
}
```
マークダウンで数式を書いてみる。
```md
**オイラーの等式**
$$
e^{i\pi}+1= 0
$$
ネイピア数$e$、虚数$i$、円周率$\pi$と有名な定数に$0$と$1$がある全部入りの数式。

**正規分布（ガウス分布）**
$$
f(x) = \frac{1}{\sqrt{2\pi\sigma^2}}\exp{-\frac{(x-\mu)^2}{2\sigma^2}}
$$
平均を$\mu$, 分散を$\sigma^2 \gt 0$とする正規分布とは、確率密度関数が次の形で与えられる確率密度関数。
```

▼**出力結果**  
> **オイラーの等式**
> $$
> e^{i\pi}+1= 0
> $$
> ネイピア数$e$、虚数$i$、円周率$\pi$と有名な定数に$0$と$1$がある全部入りの数式。
> 
> **正規分布（ガウス分布）**
> $$
> f(x) = \frac{1}{\sqrt{2\pi\sigma^2}}\exp{-\frac{(x-\mu)^2}{2\sigma^2}}
> $$
> 平均を$\mu$, 分散を$\sigma^2 \gt 0$とする正規分布とは、確率密度関数が次の形で与えられる確率密度関数。

備考：[@nuxt/content で数式を表示する](https://blog.tunehira.net/posts/display-eqations-with-nuxt-content/)の記事と同様に、数式が表示されずはまりました。スタイルシートが足りなかったことが原因でした。


## 見出しの目次を作る

[remark-toc](https://github.com/remarkjs/remark-toc)

マークダウンの中で目次を出したいところに`## Table of Contents`を書くとその位置に目次が出ます。
見出し（#）が自動的に目次になる。

```txt
## Table of Contents
```
この記事の[Table of Contents](https://www.suzu6.net/posts/265-nuxt-content-remark/#table-of-contents)もこれを利用しています。

## 改行をHTMLに適用する

マークダウンでは末尾にスペース2個で改行となります（１行間を空けると別のpタグで囲まれる）。
ただ、それを知らないとテキストと表示がずれているように感じます。

```html
マークダウン
This is a
paragraph.
↓
HTML
<p>This is a
paragraph.</p>
<!-- 1行になる -->
```

[remark-breaks](https://github.com/remarkjs/remark-breaks)はマークダウンの改行をHTMLでも改行してくれます。

```html
マークダウン
This is a
paragraph.
↓
HTML
<p>This is a<br>
paragraph.</p>
```
マークダウンの原理主義でないなら直感的にわかりやすいと思う。

## コードブロックにタイトルをつける

Qiitaなどのブログではコードブロックにファイル名などの補足があります。
あれを実現するためのパーサーが[remark-code-titles](https://www.npmjs.com/package/remark-code-titles)です。

```sh
# インストール
$ yarn add remark-code-titles
```

```js:nuxt.config.jsに追加する
export default {
  …
  content: {
      remarkPlugins: [
        'remark-code-titles'
      ],
    }
  },
```

コードブロックの先頭に **```拡張子:コードブロックのタイトル** と書くとタイトルが
`<div class="remark-code-title">コードブロックのタイトル</div>`と決まったクラスの`<div>`に囲まれる。
そこにスタイルを当ててタイトルっぽくしてます。

````txt
```python:Hello.py
printf("Hello, World!");
return 0;
```
````
▼変換したHTML。
```html
<div data-v-f58a9f50="" class="remark-code-title">hello.c</div>
<!-- ↓コードブロック↓ -->
<div data-v-f58a9f50="" class="nuxt-content-highlight">
  <pre data-v-f58a9f50="" class="line-numbers language-c"><code data-v-f58a9f50=""><span data-v-f58a9f50="" class="token function">printf</span><span data-v-f58a9f50="" class="token punctuation">(</span><span data-v-f58a9f50="" class="token string">"Hello, World!"</span><span data-v-f58a9f50="" class="token punctuation">)</span><span data-v-f58a9f50="" class="token punctuation">;</span>
<span data-v-f58a9f50="" class="token keyword">return</span> <span data-v-f58a9f50="" class="token number">0</span><span data-v-f58a9f50="" class="token punctuation">;</span>
</code></pre>
</div>
```
▼コードブロックのCSSの例。公開すると位置がずれているけどCSSわからん。
```css
.remark-code-title {
    background: #d9d7e0;
    border-radius: 0px 0px 4px 4px;
    color: #3a3a3a;
    font-size: 0.75rem;
    letter-spacing: 0.075em;
    line-height: 1;
    padding: 0.25rem 0.5rem;
    position: absolute;
    left: 1rem;
    text-align: right;
}
```

## 折り畳みを追加する

冗長な説明や長いコードブロックを折り畳むと、文章の流れを良くしつつ補足できる。
そんな折り畳み機能を追加するのが[remark-collapse](https://github.com/Rokt33r/remark-collapse)です。

```sh
$ yarn add remark-collapse
```

使い方
```txt
<details><summary>Open tango</summary>

target content

</details>
```
出力結果

<details><summary>Open tango</summary>

target content

</details>


## 脚注を作る

最高！これを探していました！

remark-footnotes[^1]を利用しています。
脚注はマークダウンのコンテンツの下部に作成されます。
文章の途中に脚注の補足を書いても下部に移動する。

星[^★]や日本語[^日本語]など数字以外の文字もいけるが、
対応する脚注は数字が自動で割り振られている。
そのため、自分で数字を合わせなければならない[^2]。

```md
文章中の脚注[^1]

[^1]: 脚注の補足

星[^★]や日本語[^日本語]など数字以外の文字もいけるが、
対応する脚注は数字が自動で割り振られている。

[^★]: 星マーク
[^日本語]: 日本語も大丈夫です。
```

ページの下部（パースしたコンテンツの最後）に脚注が出る。

[^1]: remark-footnotes: [https://github.com/remarkjs/remark-footnotes](https://github.com/remarkjs/remark-footnotes)

[^★]: 星マーク
[^日本語]: 日本語も大丈夫です。
[^2]: 自動で数字が割り振られる。ここは`[^2]`と書いている。
