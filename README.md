# 吴瑶个人学术主页

北京大学环境科学与工程学院吴瑶老师的中文单页学术主页，使用原生 HTML、CSS 和 JavaScript，兼容 GitHub Pages。

## 本地预览

在项目目录运行任意静态服务器，例如：

```bash
python3 -m http.server 8000
```

然后打开 <http://localhost:8000/>。

## 文件结构

- `index.html`：页面结构与中文内容
- `css/style.css`：响应式样式
- `js/publications.js`：24 篇一作/通讯作者论文数据
- `js/members.js`：团队成员数据，后续可直接扩展
- `js/main.js`：导航、论文筛选和基础交互
- `docs/academic-homepage-design.md`：设计说明与内容维护规则

## 发布说明

网站不包含简历 PDF、个人照片、电话号码或英文空页面。外部链接均使用新标签页和安全属性打开。部署到 GitHub Pages 时请保持相对路径结构。
