(function () {
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('#nav-menu');
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
  if (memberList) {
    memberList.innerHTML = members.map(function (member) {
      if (member.type === 'notice') {
        return '<article class="member-empty"><span class="member-mark" aria-hidden="true">+</span><div><h3>' + member.title + '</h3><p>' + member.description + '</p></div></article>';
      }
      const links = [member.homepage, member.googleScholar, member.orcid].filter(Boolean).map(function (url) {
        return '<a href="' + url + '" target="_blank" rel="noopener noreferrer">查看主页 ↗</a>';
      }).join(' ');
      const email = member.email ? '<a href="mailto:' + member.email + '">' + member.email + '</a>' : '';
      return '<article class="member-empty"><span class="member-mark" aria-hidden="true">+</span><div><h3>' + member.name + '</h3><p>' + (member.role || '') + (member.field ? ' · ' + member.field : '') + '</p><p>' + (member.background || '') + (email ? ' · ' + email : '') + (links ? ' · ' + links : '') + '</p></div></article>';
    }).join('');
  }

  const publicationsList = document.querySelector('#publications-list');
  const count = document.querySelector('#publication-count');
  const filterButtons = document.querySelectorAll('.filter-button');
  function highlightName(authors) {
    return authors.replace(/(Wu, Yao)(\*)?/g, '<strong>$1$2</strong>');
  }
  function renderPublications(filter) {
    const visible = filter === 'all' ? publications : publications.filter(function (paper) { return paper.themes.includes(filter); });
    publicationsList.innerHTML = visible.map(function (paper, index) {
      const doiUrl = 'https://doi.org/' + paper.doi;
      return '<article class="publication"><div class="publication-number">' + String(index + 1).padStart(2, '0') + '</div><div><h3 class="publication-title">' + paper.title + '</h3><p class="publication-authors">' + highlightName(paper.authors) + '</p><p class="publication-meta"><em>' + paper.journal + '</em>, ' + paper.year + ', ' + paper.detail + '<a href="' + doiUrl + '" target="_blank" rel="noopener noreferrer">DOI ↗</a></p><div class="publication-themes">' + paper.themes.map(function (theme) { const labels = { burden: '环境暴露与健康负担', climate: '极端天气与气候健康', chronic: '慢性疾病环境风险', omics: '遗传与多组学' }; return '<span class="publication-theme">' + labels[theme] + '</span>'; }).join('') + '</div></div></article>';
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

  const sections = document.querySelectorAll('main section[id], header[id]');
  const links = document.querySelectorAll('.nav-link');
  function setActiveNav(id) {
    links.forEach(function (link) {
      const active = link.getAttribute('href') === '#' + id;
      link.classList.toggle('active', active);
      if (active) link.setAttribute('aria-current', 'page');
      else link.removeAttribute('aria-current');
    });
  }
  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      setActiveNav(entry.target.id);
    });
  }, { rootMargin: '-35% 0px -55% 0px', threshold: 0 });
  sections.forEach(function (section) { observer.observe(section); });
  window.addEventListener('scroll', function () {
    if (window.scrollY < 160) setActiveNav('home');
  }, { passive: true });
  setActiveNav(window.scrollY < 160 ? 'home' : window.location.hash.slice(1) || 'home');
})();
