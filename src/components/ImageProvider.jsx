//need to create a map of all images so vite can use them in production

//import all files from the assets folder
const files = import.meta.glob("../assets/**/*.{jpg,jpeg,png,gif,mp4}", {
  eager: true,
});

const ImageProvider = {};

for (const path in files) {
  //trim the leading path off the file name
  const fileName = path.split("/").pop();
  ImageProvider[fileName] = files[path].default;
}

export default ImageProvider;
