(function () {
  const currentPage = document.body.dataset.page || 'home';
  document.querySelectorAll('.topbar .contact-link').forEach(function (link) { link.remove(); });
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('#nav-menu');

  document.querySelectorAll('[data-page-link]').forEach(function (link) {
    if (link.dataset.pageLink === currentPage) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    }
  });

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function () {
      const open = navMenu.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(open));
    });
    navMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navMenu.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  const memberList = document.querySelector('#members-list');
  if (memberList && typeof members !== 'undefined') {
    memberList.innerHTML = members.map(function (member) {
      if (member.type === 'notice') {
        return '<article class="member-empty"><span class="member-mark" aria-hidden="true">+</span><div><h3>' + member.title + '</h3><p>' + member.description + '</p></div></article>';
      }
      const email = member.email ? '<a href="mailto:' + member.email + '">' + member.email + '</a>' : '';
      return '<article class="member-empty"><span class="member-mark" aria-hidden="true">+</span><div><h3>' + member.name + '</h3><p>' + (member.role || '') + (member.field ? ' · ' + member.field : '') + '</p><p>' + (member.background || '') + (email ? ' · ' + email : '') + '</p></div></article>';
    }).join('');
  }

  const newsRotator = document.querySelector('#news-rotator');
  if (newsRotator && typeof news !== 'undefined' && news.length) {
    let newsIndex = 0;
    function renderNews() {
      const item = news[newsIndex];
      newsRotator.innerHTML = '<article class="news-item"><div class="news-meta"><span>' + item.year + '</span><span>' + item.type + '</span></div><h3>' + item.title + '</h3><p>' + item.description + '</p><a href="' + item.url + '" target="_blank" rel="noopener noreferrer">查看论文 ↗</a></article><div class="news-controls"><button type="button" class="news-control" data-news-direction="prev" aria-label="上一条动态">←</button><span>' + String(newsIndex + 1).padStart(2, '0') + ' / ' + String(news.length).padStart(2, '0') + '</span><button type="button" class="news-control" data-news-direction="next" aria-label="下一条动态">→</button></div>';
      newsRotator.querySelectorAll('[data-news-direction]').forEach(function (button) {
        button.addEventListener('click', function () {
          newsIndex = button.dataset.newsDirection === 'next' ? (newsIndex + 1) % news.length : (newsIndex - 1 + news.length) % news.length;
          renderNews();
        });
      });
    }
    renderNews();
    if (news.length > 1 && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      window.setInterval(function () {
        newsIndex = (newsIndex + 1) % news.length;
        renderNews();
      }, 6000);
    }
  }

  const publicationsList = document.querySelector('#publications-list');
  const count = document.querySelector('#publication-count');
  const filterButtons = document.querySelectorAll('.filter-button');
  if (publicationsList && count && typeof publications !== 'undefined') {
    function highlightName(authors) {
      return authors.replace(/(Wu, Yao)(\*)?/g, '<strong>$1$2</strong>');
    }
    function renderPublications(filter) {
      const visible = filter === 'all' ? publications : publications.filter(function (paper) { return paper.themes.includes(filter); });
      publicationsList.innerHTML = visible.map(function (paper, index) {
        const doiUrl = 'https://doi.org/' + paper.doi;
        const labels = { burden: '环境暴露与健康负担', climate: '极端天气与气候健康', chronic: '慢性疾病环境风险', omics: '遗传与多组学' };
        return '<article class="publication"><div class="publication-number">' + String(index + 1).padStart(2, '0') + '</div><div><h3 class="publication-title">' + paper.title + '</h3><p class="publication-authors">' + highlightName(paper.authors) + '</p><p class="publication-meta"><em>' + paper.journal + '</em>, ' + paper.year + ', ' + paper.detail + '<a href="' + doiUrl + '" target="_blank" rel="noopener noreferrer">DOI ↗</a></p><div class="publication-themes">' + paper.themes.map(function (theme) { return '<span class="publication-theme">' + labels[theme] + '</span>'; }).join('') + '</div></div></article>';
      }).join('');
      count.textContent = '显示 ' + visible.length + ' 篇';
    }
    renderPublications('all');
    filterButtons.forEach(function (button) {
      button.addEventListener('click', function () {
        filterButtons.forEach(function (item) { item.classList.remove('active'); item.setAttribute('aria-pressed', 'false'); });
        button.classList.add('active');
        button.setAttribute('aria-pressed', 'true');
        renderPublications(button.dataset.filter);
      });
    });
  }
})();
