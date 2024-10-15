import fs from 'fs';
import imagemin from 'imagemin';
import imageminJpegtran from 'imagemin-jpegtran';
import imageminPngquant from 'imagemin-pngquant';

const DEFAULT_DIR = './dist/assets/';
const DIR = process.argv.length === 2 ? DEFAULT_DIR : process.argv[2];

const files = await imagemin([DIR + '**/*.{jpg,png}'], {
  plugins: [
    imageminJpegtran(),
    imageminPngquant({
      quality: [0.8, 0.8]
    })
  ]
});

files.forEach((item) => {
  fs.writeFileSync(item.sourcePath, item.data);
  console.info('optimized ' + item.sourcePath);
})
