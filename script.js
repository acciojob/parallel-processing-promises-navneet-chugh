const output = document.getElementById("output");
const downloadButton = document.getElementById("download-images-button");

const images = [
  { url: "https://picsum.photos/id/237/200/300", alt: "Image 1" },
  { url: "https://picsum.photos/id/238/200/300", alt: "Image 2" },
  { url: "https://picsum.photos/id/239/200/300", alt: "Image 3" },
];

downloadButton.addEventListener('click', () => {
    downloadImages(images)
        .then(images => {
            displayImages(images);
        })
        .catch(error => {
            console.error(error);
        });
});

function downloadImages(images) {
    const promises = images.map(image => {
        return fetch(image.url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Failed to load image's URL: ${image.url}`);
                }
                return response.blob();
            })
            .then(blob => {
                const imageUrl = URL.createObjectURL(blob);
                return { url: imageUrl, alt: image.alt };
            });
    });

    return Promise.all(promises);
}

function displayImages(images) {
    output.innerHTML = '';
    images.forEach(image => {
        const imgElement = document.createElement('img');
        imgElement.src = image.url;
        imgElement.alt = image.alt;
        output.appendChild(imgElement);
    });
}
