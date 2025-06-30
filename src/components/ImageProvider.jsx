//need to create a map of all images so vite can use them in production
const files = import.meta.glob('../assets/**/*.{jpg,jpeg,png,gif,mp4}', { eager: true });

const ImageProvider = {};
for (const path in files) {
  const fileName = path.split('/').pop();
  ImageProvider[fileName] = files[path].default; 
}

export default ImageProvider;