const escapeHtml = (value) =>
  String(value).replace(/[&<>"']/g, (character) => {
    const entities = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    };
    return entities[character];
  });

const formatDate = (value) => {
  const date = new Date(`${value.slice(0, 10)}T12:00:00`);
  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date);
};

const youtubeEmbed = (value) => {
  try {
    const url = new URL(value);
    let videoId = '';

    if (url.hostname === 'youtu.be') {
      videoId = url.pathname.slice(1);
    } else if (
      url.hostname === 'youtube.com' ||
      url.hostname === 'www.youtube.com' ||
      url.hostname === 'm.youtube.com'
    ) {
      videoId = url.searchParams.get('v') || '';
    }

    if (!/^[\w-]{11}$/.test(videoId)) {
      return '';
    }

    return `<div class="video-frame"><iframe src="https://www.youtube-nocookie.com/embed/${videoId}" title="YouTube video" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe></div>`;
  } catch (error) {
    if (!(error instanceof TypeError)) {
      throw error;
    }
    console.warn('Skipping an invalid YouTube embed URL:', value);
    return '';
  }
};

const convertWordPressEmbeds = (content) => {
  const toEmbedOrLink = (value) => {
    const url = value.trim();
    const video = youtubeEmbed(url);
    if (video) {
      return video;
    }

    try {
      const parsedUrl = new URL(url);
      if (parsedUrl.protocol !== 'https:' && parsedUrl.protocol !== 'http:') {
        console.warn('Skipping an embedded URL with an unsupported protocol:', url);
        return '';
      }

      return `<p class="embed-link"><a href="${escapeHtml(parsedUrl.href)}" target="_blank" rel="noopener noreferrer">View embedded media</a></p>`;
    } catch (error) {
      if (!(error instanceof TypeError)) {
        throw error;
      }
      console.warn('Skipping an invalid embedded URL:', url);
      return '';
    }
  };

  const standaloneYoutubeUrl = content.trim();
  if (
    /^https?:\/\/(?:www\.)?(?:youtube\.com|youtu\.be)\/\S+$/i.test(
      standaloneYoutubeUrl
    )
  ) {
    return toEmbedOrLink(standaloneYoutubeUrl);
  }

  return content
    .replace(/\[youtube\s+(https?:\/\/[^\s\]]+)[^\]]*\]/gi, (_match, url) =>
      toEmbedOrLink(url)
    )
    .replace(/\[embed\]\s*(https?:\/\/[^\s[]+?)\s*\[\/embed\]/gi, (_match, url) =>
      toEmbedOrLink(url)
    );
};

const archivedImageDescriptions = {
  'CbOS2PnVIAAzug4.jpg:large': 'Photo included with the original post.',
  'rfRu6ct.jpg': 'Humorous image included with the original post.',
  'rn4bikxtcbcgbx47bc8j.jpg': 'Tiger Woods holds up a golf shoe.',
  'office-workers.jpg': 'An illustration of coworkers at computers in an office.',
  'leo-21.jpg': 'Leonardo DiCaprio holding his Oscar statuette.',
  'trump-super-tuesday-2-1200x630-1456926693.jpg':
    'Donald Trump speaks at a podium in front of American flags.',
  'ufc-president-dana-white-is-all-smiles-during-a-press-confer.jpeg':
    'A man presents a UFC championship belt.',
  'hsu.gif': 'Derek Sivers on being happy, smart, and useful.',
  'fwyowu2dliqrrirrxi6b.jpg': 'A silhouetted figure in a red-lit interior.',
  'side32.jpg': 'A small cube-shaped projector.'
};

const sanitizeContent = (content, imageContext = 'the original post') => {
  const template = document.createElement('template');
  template.innerHTML = content;
  template.content.querySelectorAll('img').forEach((image) => {
    if (!image.alt.trim()) {
      const source = image.getAttribute('src') || '';
      const filename = source.split('/').pop().split('?')[0];
      image.alt =
        archivedImageDescriptions[filename] || `Image from ${imageContext}.`;
    }
  });
  template.content
    .querySelectorAll('script, style, link, base, meta, object, embed, form, iframe')
    .forEach((element) => element.remove());

  template.content.querySelectorAll('*').forEach((element) => {
    Array.from(element.attributes).forEach((attribute) => {
      const name = attribute.name.toLowerCase();
      const value = attribute.value.trim();
      const isUrlAttribute = ['href', 'src', 'xlink:href', 'action', 'formaction'].includes(name);

      if (
        name.startsWith('on') ||
        name === 'srcdoc' ||
        name === 'style' ||
        (isUrlAttribute && /^\s*(javascript|vbscript|data):/i.test(value))
      ) {
        element.removeAttribute(attribute.name);
      }
    });
  });

  return convertWordPressEmbeds(template.innerHTML);
};

const handleImageErrors = (container) => {
  container.querySelectorAll('img').forEach((image) => {
    image.addEventListener(
      'error',
      () => {
        console.warn('Could not load an image from imported content:', image.src);
        const fallback = document.createElement('span');
        fallback.className = 'media-fallback';
        fallback.textContent = image.alt
          ? `Image unavailable: ${image.alt}`
          : 'Image unavailable';
        image.replaceWith(fallback);
      },
      { once: true }
    );
  });
};

const getExcerpt = (content, length = 190) => {
  const documentContent = new DOMParser().parseFromString(
    sanitizeContent(content),
    'text/html'
  );
  const text = documentContent.body.textContent.replace(/\s+/g, ' ').trim();
  return text.length > length ? `${text.slice(0, length).trimEnd()}…` : text;
};

const renderPostCards = (posts, limit) => {
  const visiblePosts = typeof limit === 'number' ? posts.slice(0, limit) : posts;

  return visiblePosts
    .map((post) => {
      const excerpt = getExcerpt(post.content);
      return `
        <article class="post-card">
          <p class="post-meta">${escapeHtml(formatDate(post.date))}${
            post.categories.length
              ? ` · ${escapeHtml(post.categories.join(', '))}`
              : ''
          }</p>
          <h3><a href="post.html?slug=${encodeURIComponent(post.slug)}">${escapeHtml(
            post.title
          )}</a></h3>
          <p>${escapeHtml(excerpt || 'A post from the original Jopism archive.')}</p>
          <a class="text-link" href="post.html?slug=${encodeURIComponent(
            post.slug
          )}">Read post <span aria-hidden="true">→</span></a>
        </article>
      `;
    })
    .join('');
};

const showError = (container, message) => {
  if (container) {
    container.innerHTML = `<p class="error-message">${escapeHtml(message)}</p>`;
  }
};

const loadSiteContent = async () => {
  const [postsResponse, pagesResponse] = await Promise.all([
    fetch('data/posts.json'),
    fetch('data/pages.json')
  ]);

  if (!postsResponse.ok || !pagesResponse.ok) {
    throw new Error('The site content could not be loaded.');
  }

  const [posts, pages] = await Promise.all([
    postsResponse.json(),
    pagesResponse.json()
  ]);

  posts.sort((first, second) => second.date.localeCompare(first.date));
  return { posts, pages };
};

const loadFantasyStats = async () => {
  const card = document.getElementById('fantasy-snapshot');
  if (!card) {
    return;
  }

  const status = document.getElementById('sleeper-refresh-status');
  try {
    const response = await fetch('data/fantasy-stats.json');
    if (!response.ok) {
      throw new Error(`Fantasy stats request failed with status ${response.status}.`);
    }

    const stats = await response.json();
    const sleeper = stats.sleeper;
    const updatedAt = new Date(stats.updatedAt);
    if (!sleeper || Number.isNaN(updatedAt.getTime())) {
      throw new Error('The published fantasy stats are incomplete.');
    }

    document.getElementById('sleeper-updated').textContent =
      `Sleeper · updated ${new Intl.DateTimeFormat(undefined, {
        dateStyle: 'medium'
      }).format(updatedAt)}`;
    document.getElementById('sleeper-league-name').textContent =
      sleeper.leagueName;
    document.getElementById('sleeper-team').textContent =
      `${sleeper.totalTeams}-team dynasty · ${sleeper.teamName} · @${sleeper.username}`;
    document.getElementById('sleeper-record').textContent =
      `${sleeper.wins}–${sleeper.losses}${sleeper.ties ? `–${sleeper.ties}` : ''}`;
    document.getElementById('sleeper-points').textContent =
      Number(sleeper.pointsFor).toFixed(1);
    document.getElementById('sleeper-week').textContent = sleeper.week;
    document.getElementById('sleeper-size').textContent =
      `${sleeper.totalTeams} teams`;
    document.getElementById('sleeper-matchup').textContent = sleeper.matchup
      ? `Week ${sleeper.week}: ${sleeper.matchup.teamName} ${Number(
          sleeper.matchup.points
        ).toFixed(1)} – ${Number(sleeper.matchup.opponentPoints).toFixed(1)} ${
          sleeper.matchup.opponentName
        }.`
      : `Week ${sleeper.week} matchup details are not available yet.`;
    status.textContent = '';
  } catch (error) {
    console.error('Unable to load scheduled fantasy football stats:', error);
    status.textContent =
      'The latest scheduled update could not be loaded; showing the last published stats.';
  }
};

const loadGolfRounds = async () => {
  const list = document.getElementById('golf-round-list');
  if (!list) {
    return;
  }

  const error = document.getElementById('golf-round-error');
  try {
    const response = await fetch('data/golf-recent-rounds.json');
    if (!response.ok) {
      throw new Error(
        `Golf rounds request failed with status ${response.status}.`
      );
    }

    const rounds = await response.json();
    if (
      !Array.isArray(rounds) ||
      rounds.length !== 15 ||
      rounds.some(
        (round) =>
          typeof round.date !== 'string' ||
          typeof round.course !== 'string' ||
          !Number.isInteger(round.score) ||
          typeof round.toPar !== 'string'
      )
    ) {
      throw new Error('The published golf rounds are invalid.');
    }

    const fragment = document.createDocumentFragment();
    rounds.forEach((round) => {
      const item = document.createElement('li');
      item.className = 'golf-round';

      const details = document.createElement('span');
      details.className = 'golf-round-details';
      const date = document.createElement('strong');
      date.textContent = round.date;
      const course = document.createElement('span');
      course.textContent = round.course;
      details.append(date, course);

      const score = document.createElement('strong');
      score.className = 'golf-round-score';
      score.textContent = `${round.score} (${round.toPar})${
        round.score < 60 ? ' · 9 holes' : ''
      }`;
      item.append(details, score);
      fragment.append(item);
    });
    list.replaceChildren(fragment);
    error.textContent = '';
  } catch (loadError) {
    console.error('Unable to load Garmin golf rounds:', loadError);
    error.textContent = 'The Garmin golf rounds could not be loaded.';
  }
};

const postList = document.getElementById('post-list');
const featuredPostList = document.getElementById('featured-posts');
const blogSearch = document.getElementById('post-search');
const categoryFilter = document.getElementById('post-category-filter');
const postResults = document.getElementById('post-results');
const postDetail = document.getElementById('post-detail');
const pageDetail = document.getElementById('page-detail');

loadFantasyStats();
loadGolfRounds();

loadSiteContent()
  .then(({ posts, pages }) => {
    if (postList) {
      postList.innerHTML = renderPostCards(
        posts,
        postList.dataset.limit ? Number(postList.dataset.limit) : undefined
      );
    }

    if (featuredPostList) {
      const featuredPosts = [...posts]
        .sort((first, second) => new Date(second.date) - new Date(first.date))
        .slice(0, 4);
      featuredPostList.innerHTML = renderPostCards(featuredPosts);
    }

    if (blogSearch && postList) {
      if (categoryFilter) {
        const categories = [...new Set(posts.flatMap((post) => post.categories))].sort(
          (first, second) => first.localeCompare(second)
        );
        categories.forEach((category) => {
          const option = document.createElement('option');
          option.value = category;
          option.textContent = category;
          categoryFilter.append(option);
        });
      }

      const updateArchive = () => {
        const query = blogSearch.value.trim().toLowerCase();
        const selectedCategory = categoryFilter ? categoryFilter.value : '';
        const filteredPosts = posts.filter(
          (post) =>
            (!selectedCategory || post.categories.includes(selectedCategory)) &&
            `${post.title} ${post.categories.join(' ')} ${getExcerpt(post.content, 1000)}`
              .toLowerCase()
              .includes(query)
        );
        postList.innerHTML = filteredPosts.length
          ? renderPostCards(filteredPosts)
          : '<p class="empty-state">No posts match those filters. Try another search or category.</p>';
        if (postResults) {
          postResults.textContent = `${filteredPosts.length} ${
            filteredPosts.length === 1 ? 'post' : 'posts'
          } found`;
        }
      };

      blogSearch.addEventListener('input', updateArchive);
      if (categoryFilter) {
        categoryFilter.addEventListener('change', updateArchive);
      }
      updateArchive();
    }

    if (postDetail) {
      const slug = new URLSearchParams(window.location.search).get('slug');
      const post = posts.find((item) => item.slug === slug);

      if (!post) {
        showError(postDetail, 'That post could not be found.');
        return;
      }

      document.title = `${post.title} — Jopism`;
      const comments = post.comments
        .map(
          (comment) => `
            <article class="comment">
              <p class="post-meta">${escapeHtml(comment.author)} · ${escapeHtml(
                formatDate(comment.date)
              )}</p>
              <p>${escapeHtml(comment.content).replace(/\r?\n/g, '<br />')}</p>
            </article>
          `
        )
        .join('');

      postDetail.innerHTML = `
        <p class="post-meta">${escapeHtml(formatDate(post.date))}${
          post.categories.length
            ? ` · ${escapeHtml(post.categories.join(', '))}`
            : ''
        }</p>
        <h1>${escapeHtml(post.title)}</h1>
        <div class="article-content">${sanitizeContent(
          post.content,
          `the post “${post.title}”`
        )}</div>
        ${
          comments
            ? `<section class="comments" aria-labelledby="comments-heading"><h2 id="comments-heading">Comments</h2>${comments}</section>`
            : ''
        }
      `;
      handleImageErrors(postDetail);
    }

    if (pageDetail) {
      const slug = new URLSearchParams(window.location.search).get('slug');
      const page = pages.find((item) => item.slug === slug);

      if (!page) {
        showError(pageDetail, 'That page could not be found.');
        return;
      }

      document.title = `${page.title} — Jopism`;
      pageDetail.innerHTML = `
        <p class="post-meta">From the original Jopism site</p>
        <h1>${escapeHtml(page.title)}</h1>
        ${
          page.slug === 'about'
            ? `<div class="about-page-layout">
                <figure class="about-portrait">
                  <img src="media/about/jop-golf-cartoon.png" alt="A cartoon portrait of Jop holding a golf club beside a golf bag." loading="lazy" decoding="async">
                </figure>
                <div class="article-content">${sanitizeContent(
                  page.content,
                  `the ${page.title} page`
                )}</div>
              </div>`
            : `<div class="article-content">${sanitizeContent(
                page.content,
                `the ${page.title} page`
              )}</div>`
        }
      `;
      handleImageErrors(pageDetail);
    }
  })
  .catch((error) => {
    console.error(error);
    showError(postList || postDetail || pageDetail || pageList, error.message);
  });
