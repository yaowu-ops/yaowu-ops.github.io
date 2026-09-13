# 吴瑶个人学术主页

北京大学环境科学与工程学院吴瑶老师的中文多页面学术主页，使用原生 HTML、CSS 和 JavaScript，兼容 GitHub Pages。

## 本地预览

在项目目录运行任意静态服务器，例如：

```bash
python3 -m http.server 8000
```

然后打开 <http://localhost:8000/>。

## 文件结构

- `index.html`：首页，包含个人简介、News 和两个主要入口
- `profile.html`：个人简介、教育和工作经历
- `research.html`：四个研究方向
- `team.html`：团队成员
- `publications.html`：24 篇代表性成果与主题筛选
- `join.html`：招生与招聘信息
- `links.html`：相关学术链接
- `css/style.css`：响应式样式
- `js/news.js`：首页 News 数据
- `js/publications.js`：24 篇一作/通讯作者论文数据
- `js/members.js`：团队成员数据，后续可直接扩展
- `js/main.js`：导航、论文筛选和基础交互
- `docs/academic-homepage-design.md`：设计说明与内容维护规则

## 发布说明

网站不包含简历 PDF、个人照片、电话号码或英文空页面。外部链接均使用新标签页和安全属性打开。部署到 GitHub Pages 时请保持相对路径结构。
