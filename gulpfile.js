import path from 'path'
import fs from 'fs'
import { glob } from 'glob'

import {src, dest, watch, series} from 'gulp'
import * as dartSass from 'sass'
import gulpSass from 'gulp-sass'    

const sass = gulpSass(dartSass) /* enves de encontrar sass en nodemodules la encuentra aquí */

import terser from 'gulp-terser'
import sharp from 'sharp'

export function js(done) {
    src('src/js/app.js')
        .pipe(terser()) /* terser mimifica el codigo de JS */
        .pipe( dest('build/js') )

    done()
}

export function css( done ){
    src('src/scss/app.scss', {sourcemaps: true}) /* esta tomando el src del import de gulp */
        .pipe( sass({outputStyle: 'compressed'}).on('error', sass.logError)) /* ubica src, luego ejecuta sass */
        /* on esta verificando si hay errore, en tal caso los manda a consola el error*/
        .pipe( dest('build/css', {sourcemaps: '.'})) /* luego lo compilado lo almacena en build css */

    done();
}


export async function crop(done) {
    const inputFolder = 'src/img/gallery/full'
    const outputFolder = 'src/img/gallery/thumb';
    // aquí recorta las imágenes
    const width = 250;
    const height = 180;
    if (!fs.existsSync(outputFolder)) { //verifica que exista thumb sino crea la carpeta 
        fs.mkdirSync(outputFolder, { recursive: true })
    }
    const images = fs.readdirSync(inputFolder).filter(file => {
        return /\.(jpg)$/i.test(path.extname(file)); //revisa que sean imagenes para empezar a procesarlas
    });
    try {
        images.forEach(file => { //empieza a procesar las imagenes 
            const inputFile = path.join(inputFolder, file)
            const outputFile = path.join(outputFolder, file)
            sharp(inputFile) 
                .resize(width, height, {
                    position: 'centre'
                })
                .toFile(outputFile) //lo almacena en la carpeta 
        });

        done()
    } catch (error) {
        console.log(error)
    }
}



export async function imagenes(done) {  //webp
    const srcDir = './src/img';
    const buildDir = './build/img';
    const images =  await glob('./src/img/**/*{jpg,png}')

    images.forEach(file => {
        const relativePath = path.relative(srcDir, path.dirname(file));
        const outputSubDir = path.join(buildDir, relativePath);
        procesarImagenes(file, outputSubDir);
    });
    done();
}

function procesarImagenes(file, outputSubDir) {
    if (!fs.existsSync(outputSubDir)) {
        fs.mkdirSync(outputSubDir, { recursive: true })
    }
    const baseName = path.basename(file, path.extname(file))
    const extName = path.extname(file)
    const outputFile = path.join(outputSubDir, `${baseName}${extName}`)
    const outputFileWebp = path.join(outputSubDir, `${baseName}.webp`)
    const outputFileAvif = path.join(outputSubDir, `${baseName}.avif`)

    const options = { quality: 80 }
    sharp(file).jpeg(options).toFile(outputFile)
    sharp(file).webp(options).toFile(outputFileWebp)
    sharp(file).avif().toFile(outputFileAvif) //se le quitó options para que no genere un archivo más grande por el 80% de quality
}

export function dev() {
    watch('src/scss/**/*.scss', css) /* observa lo que sucede en el primer parametro, y lo actualiza ejecutando function css */
    /*  ** todos los archivos */
    watch('src/js/**/*.js', js)
    watch('src/img/**/*.{png,jpg}', imagenes)
}

/* export default series (crop, js, css, imagenes, dev) */
export default series ( js, css, dev)


