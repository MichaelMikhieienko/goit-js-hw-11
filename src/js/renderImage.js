export function renderImage(images) {
  return images.map(image => {
    return `<div class="photo-card">
                <img width="300" src="${image.webformatURL}" alt="${images.tags}" loading="lazy" />
                <div class="info">
                    <p class="info-item">
                        <b>Likes</b>
                        <span>${image.likes}</span>
                    </p>
                    <p class="info-item">
                        <b>Views</b>
                        <span>${image.views}</span>
                    </p>
                    <p class="info-item">
                        <b>Comments</b>
                        <span>${image.comments}</span>
                    </p>
                    <p class="info-item">
                        <b>Downloads</b>
                        <span>${image.downloads}</span>
                    </p>
                </div>
            </div>`;
  });
}
