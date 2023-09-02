//your JS code here. If required.
const output = document.getElementById("output");
const btn = document.getElementById("download-images-button");

const images = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" },
];
downloadButton.addEventListener('click', () => {
            downloadImages(imageUrls)
                .then(images => {
                    displayImages(images);
                })
                .catch(error => {
                    console.error(error);
                });
        });

        function downloadImages(imageUrls) {
            const promises = imageUrls.map(image => {
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
            outputDiv.innerHTML = '';
            images.forEach(image => {
                const imgElement = document.createElement('img');
                imgElement.src = image.url;
                imgElement.alt = image.alt;
                outputDiv.appendChild(imgElement);
            });
        }