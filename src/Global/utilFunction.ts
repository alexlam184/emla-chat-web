export async function checkImage(url): Promise<boolean> {
  try {
    const res = await fetch(url);
    const buff = await res.blob();
    return buff.type.startsWith("image/");
  } catch (e) {
    return false;
  }
}

export function toDataURL(url) {
  return fetch(url)
    .then((response) => {
      return response.blob();
    })
    .then((blob) => {
      return URL.createObjectURL(blob);
    });
}

export function downloadImage(url) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.responseType = "blob";
    xhr.onload = () => {
      if (xhr.status === 200) {
        resolve(xhr.response);
      } else {
        reject(Error(`Failed to load image from ${url}`));
      }
    };
    xhr.onerror = reject;
    xhr.send();
  });
}
