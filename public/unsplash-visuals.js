(function () {
  'use strict';
  const escape = value => String(value).replace(/[&<>"']/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  function link(value) {
    try {
      const url = new URL(value);
      if (url.protocol !== 'https:' || url.hostname !== 'unsplash.com') return 'https://unsplash.com/?utm_source=nexo&utm_medium=referral';
      url.searchParams.set('utm_source','nexo');
      url.searchParams.set('utm_medium','referral');
      return escape(url.href);
    } catch { return 'https://unsplash.com/?utm_source=nexo&utm_medium=referral'; }
  }
  window.NEXO_UNSPLASH_VISUAL = function (s,t,question='') {
    const entry = window.NEXO_UNSPLASH_PHOTOS?.[s]?.[t];
    if (!entry?.photos?.length) return '';
    // Stable across answer feedback and shuffled options. Only the prompt selects a photo.
    let hash = 0;
    for (const char of question) hash = (Math.imul(hash,31)+char.charCodeAt(0))>>>0;
    const photo = entry.photos[hash % entry.photos.length];
    let url;
    try {
      url = new URL(photo.url);
      if (url.protocol !== 'https:' || url.hostname !== 'images.unsplash.com') return '';
      url.searchParams.set('w','960');url.searchParams.set('q','75');url.searchParams.set('auto','format');
    } catch { return ''; }
    return `<figure class="nexo-photo"><img src="${escape(url.href)}" alt="Fotografia de contexto para ${escape(entry.title)}" loading="lazy" decoding="async" width="960" height="540" onerror="this.closest('figure').hidden=true"><figcaption>Foto de contexto • ${escape(entry.title)}. <span>Imagem ilustrativa; use os dados do enunciado para responder.</span><br>Foto de <a href="${link(photo.profile)}" target="_blank" rel="noopener noreferrer">${escape(photo.photographer)}</a> no <a href="${link(photo.page)}" target="_blank" rel="noopener noreferrer">Unsplash</a>.</figcaption></figure>`;
  };
})();
