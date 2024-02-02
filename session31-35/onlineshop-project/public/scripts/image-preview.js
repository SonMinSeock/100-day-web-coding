const imageFileInputElement = document.getElementById("image");
const previewImageElement = document.querySelector("#image-upload-control img");

function selectedImage(event) {
  //const files = event.target.files;
  const files = imageFileInputElement.files;
  if (!files || files.length === 0) {
    previewImageElement.style.display = "none";
    return;
  }

  const pickedFile = files[0];
  const fileUrl = URL.createObjectURL(pickedFile);

  previewImageElement.src = fileUrl;
  previewImageElement.style.display = "block";
}

imageFileInputElement.addEventListener("change", selectedImage);
