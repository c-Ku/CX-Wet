const gulp = require('gulp')
const sass = require('gulp-sass')
const minifyCSS = require('gulp-minify-css')
const uglify = require('gulp-uglify')
const rename = require('gulp-rename')
const ts = require('gulp-typescript')
const replace = require('gulp-replace')

const path = require('path')
const modify = require('gulp-modify')
const readJson = require('read-package-json')

const tsProject = ts.createProject('tsconfig.json')

const packages = {
  'object-path': {
    path: ['node_modules/object-path/index.js'],
    rename: 'index',
  },
}

gulp.task('wxml', function() {
  return gulp.src('src/**/*.wxml').pipe(gulp.dest('dist'))
})

gulp.task('ts2js', function() {
  return (
    gulp
      .src(['src/**/*.ts', '!src/**/*.type.ts'])
      .pipe(tsProject())
      .js.pipe(replace('exports.', 'module.exports.'))
      .pipe(
        modify({
          fileModifier: (file, contents) => {
            const matches = contents.match(/require\("(.*?)"\)/g)
            if (!matches) {
              return contents
            }

            let rPath = path.relative(file.path, './dist')
            rPath = rPath.substring(0, rPath.length - 2)

            matches.forEach(match => {
              const package = match.substring(9, match.length - 2)
              if (package && Object.keys(packages).indexOf(package) >= 0) {
                contents = contents.replace(
                  `require("${package}")`,
                  `require("${rPath}lib/${package}/${packages[package].rename}")`,
                )
              }
            })

            return contents
          },
        }),
      )
      .pipe(uglify())
      .pipe(gulp.dest('dist'))
  )
})

gulp.task('sass2wxss', function() {
  return gulp
    .src('src/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(
      minifyCSS({
        keepBreaks: true,
      }),
    )
    .pipe(
      rename({
        extname: '.wxss',
      }),
    )
    .pipe(gulp.dest('dist'))
})

gulp.task('static', function() {
  return gulp
    .src(['src/**/*.png', 'src/**/*.svg', 'src/**/*.ttf', 'src/**/*.woff', 'src/**/*.eot', 'src/**/*.json'])
    .pipe(gulp.dest('dist'))
})

gulp.task('copyLibs', function() {
  Object.keys(packages).forEach(package => {
    packages[package].path.forEach(item => {
      gulp.src(item)
      .pipe(gulp.dest(`dist/lib/${package}`))
    })
  })
})

gulp.task('build', ['wxml', 'ts2js', 'sass2wxss', 'static', 'copyLibs'], () => {
  gulp.watch('src/**/*.wxml', ['wxml'])
  gulp.watch('src/**/*.ts', ['ts2js'])
  gulp.watch('src/**/*.scss', ['sass2wxss'])
  gulp.watch(['src/**/*.png', 'src/**/*.svg', 'src/**/*.ttf', 'src/**/*.woff', 'src/**/*.eot', 'src/**/*.json'], ['static'])
})
