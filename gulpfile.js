'use strict';

/**
 * Gulp Setting
 * --------------------------------------
 * #기본 설치
 * 	1. node.js 설치	(LTS) 			- https://nodejs.org/
 * 	2. Git Bash 설치 						- https://git-scm.com/downloads
 * --------------------------------------
 * #모듈 설치
 * 	모듈 : $ npm install
 * 	전역 : $ npm i -g gulp
 * 	전역 : $ npm i -g sass
 * 	시작 : $ gulp
 * 	종료 : Ctrl + c
 * --------------------------------------
**/


//Gulp Module
const gulp = require('gulp');

//Sass Module
// const scss = require('gulp-sass');
const sass = require('gulp-dart-sass');
const sourcemaps = require('gulp-sourcemaps');

//JS Module
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const rename = require('gulp-rename');

//Server Module
const browserSync = require('browser-sync');





/**
 * CONFIG
 * --------------------------------------
 */

const CONFIG = {
	WORKLIST : {
		HTML : {
			DEST : './webApp/**/*.html'
		}
		, SASS : {
			SRC : './src/worklist/resource/scss/**/*.scss'
			, DEST1 : './webApp/PC/html/_pub_guide/resource/css' //[수정]
			, DEST2 : './webApp/MO/html/_pub_guide/resource/css' //[수정]
			, DEST3 : './webApp/ADMIN/html/_pub_guide/resource/css' //[수정]
			, DEST_FILE_NAME : 'worklist.min.css'
			, OPTION : {
				outputStyle: 'compressed'
			}
		}
		, SCRIPT : {
			SRC : [
				// plugins
				'./src/worklist/resource/plugins/modernizr.js'
				, './src/worklist/resource/plugins/detectizr.min.js'
				, './src/worklist/resource/plugins/jquery-1.12.0.min.js'
				, './src/worklist/resource/plugins/jquery.colorbox.js'
				, './src/worklist/resource/plugins/jquery.quicksearch.js'

				// worklist
				, './src/worklist/resource/js/worklist.js'
			]
			, DEST1 : './webApp/PC/html/_pub_guide/resource/js' //[수정]
			, DEST2 : './webApp/MO/html/_pub_guide/resource/js' //[수정]
			, DEST3 : './webApp/ADMIN/html/_pub_guide/resource/js' //[수정]
			, DEST_FILE_NAME : 'worklist.min.js'

			, SRC_INCLUDE : './src/worklist/resource/js/worklist.include.js' //[SRC_INCLUDE]
		}


		, SERVER : {
			port : 3900
			, server : {baseDir : './webApp/'}
			// , browser: ['Google Chrome']//Mac OS
			, browser: ['Chrome']//window OS
			, watch : true
		}
	}
	, TOOLS : {
		TABLE : {
			SASS : {
				SRC : './src/tools/table/css/**/*.scss'
				, DEST1 : './webApp/PC/html/_pub_guide/resource/css' //[수정]
				, OPTION : {
					outputStyle: 'compressed'
				}
			}
			, SCRIPT : {
				SRC : [
					'./src/tools/table/js/jquery.js'
					, './src/tools/table/js/jquery.splitter.js'
					, './src/tools/table/js/CSVParser.js'
					, './src/tools/table/js/DataGridRenderer.js'
					, './src/tools/table/js/converter.js'
					, './src/tools/table/js/Controller.js'
				]
				, DEST_FILE_NAME : 'tools.table.min.js'
				, DEST1 : './webApp/PC/html/_pub_guide/resource/js' //[수정]
			}
		}
	}
}


/**
 * WORKLIST 
 * --------------------------------------
 */

gulp.task( 'SCSS:WORKLIST', () => {
	return new Promise( resolve => {
		gulp.src(CONFIG.WORKLIST.SASS.SRC)
			.pipe(rename({ suffix: '.min' }))
			.pipe(sourcemaps.init() )
			.pipe(sass.sync(CONFIG.WORKLIST.SASS.OPTION ).on('error', sass.logError) )
			.pipe(sourcemaps.write('./') )
			.pipe(gulp.dest(CONFIG.WORKLIST.SASS.DEST1) )//[수정]
			.pipe(gulp.dest(CONFIG.WORKLIST.SASS.DEST2) )//[수정]
			.pipe(gulp.dest(CONFIG.WORKLIST.SASS.DEST3) )//[수정]
			// .pipe( browserSync.reload({stream: true}) )
		;
		resolve();
	});
});


//[SCRIPT + PLUGINS]
gulp.task('SCRIPT:WORKLIST', () => { 
	return new Promise( resolve => { 
		gulp.src(CONFIG.WORKLIST.SCRIPT.SRC)
			.pipe(concat(CONFIG.WORKLIST.SCRIPT.DEST_FILE_NAME))
			.pipe(uglify({mangle: true }))
			.pipe(gulp.dest(CONFIG.WORKLIST.SCRIPT.DEST1))//[수정]
			.pipe(gulp.dest(CONFIG.WORKLIST.SCRIPT.DEST2))//[수정]
			.pipe(gulp.dest(CONFIG.WORKLIST.SCRIPT.DEST3))//[수정]
		;
		resolve(); 
	});
});

//[SCRIPT_INC]
gulp.task('SCRIPT:WORKLIST_INCLUDE', () => { 
	return new Promise( resolve => { 
		gulp.src(CONFIG.WORKLIST.SCRIPT.SRC_INCLUDE)
			// .pipe(concat(CONFIG.WORKLIST.SCRIPT.DEST_FILE_NAME))
			// .pipe(uglify({mangle: true }))
			.pipe(gulp.dest(CONFIG.WORKLIST.SCRIPT.DEST1))//[수정]
			.pipe(gulp.dest(CONFIG.WORKLIST.SCRIPT.DEST2))//[수정]
			.pipe(gulp.dest(CONFIG.WORKLIST.SCRIPT.DEST3))//[수정]
		;
		resolve(); 
	});
});

gulp.task('SERVER:WORKLIST', () => {
	return new Promise( resolve => {
			browserSync.init( null, CONFIG.WORKLIST.SERVER);
			// gulp.watch(CONFIG.WORKLIST.HTML.DEST).on("change", browserSync.reload);
			gulp.watch(CONFIG.WORKLIST.SASS.SRC, gulp.series(['SCSS:WORKLIST']));
			gulp.watch(CONFIG.WORKLIST.SCRIPT.SRC, gulp.series('SCRIPT:WORKLIST'));
			gulp.watch(CONFIG.WORKLIST.SCRIPT.SRC_INCLUDE, gulp.series('SCRIPT:WORKLIST_INCLUDE'));
			resolve();
	});
});



/**
 * DATA CONVERTOR
 * --------------------------------------
 */

//[TOOLS]
gulp.task('TABLE:SCRIPT', () => { 
	return new Promise( resolve => { 
		gulp.src(CONFIG.TOOLS.TABLE.SCRIPT.SRC)
			.pipe(concat(CONFIG.TOOLS.TABLE.SCRIPT.DEST_FILE_NAME))
			.pipe(uglify({mangle: true }))
			.pipe(gulp.dest(CONFIG.TOOLS.TABLE.SCRIPT.DEST1))
			// .pipe(gulp.dest(CONFIG.TOOLS.TABLE.SCRIPT.DEST2))
		;
		resolve(); 
	});
});


gulp.task( 'TABLE:SCSS', () => {
	return new Promise( resolve => {
			gulp.src( CONFIG.TOOLS.TABLE.SASS.SRC )
			.pipe(rename({ suffix: '.min' }))
			.pipe( sourcemaps.init() )
			.pipe( sass.sync( CONFIG.TOOLS.TABLE.SASS.OPTION ).on('error', sass.logError) )
			.pipe( sourcemaps.write('./') )
			.pipe( gulp.dest( CONFIG.TOOLS.TABLE.SASS.DEST1) )
			// .pipe( gulp.dest( CONFIG.TOOLS.TABLE.SASS.DEST2) )
			// .pipe( browserSync.reload({stream: true}) )
		;
		resolve();
	});
});




gulp.task( 'default', gulp.series(['SCSS:WORKLIST', 'SCRIPT:WORKLIST', 'SCRIPT:WORKLIST_INCLUDE', 'TABLE:SCRIPT', 'TABLE:SCSS', 'SERVER:WORKLIST']));
gulp.task( 'worklist', gulp.series(['SCSS:WORKLIST', 'SCRIPT:WORKLIST', 'SERVER:WORKLIST']));
gulp.task( 'table', gulp.series(['TABLE:SCRIPT', 'TABLE:SCSS']));
