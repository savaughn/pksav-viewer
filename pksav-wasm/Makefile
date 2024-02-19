
src/pksav.mjs: src/pksav.c
	emcc --no-entry src/pksav.c -o src/pksav.mjs  \
	  --pre-js src/locateFile.js  \
	  -Iinclude -L../../pksav/build-wasm/lib -lpksav  \
	  -s ENVIRONMENT='web'  \
	  -s EXPORT_NAME='createModule'  \
	  -s USE_ES6_IMPORT_META=0  \
	  -s FORCE_FILESYSTEM=1  \
	  -s EXPORTED_FUNCTIONS='["_malloc", "_free", "_strcat", "_printf"]'  \
	  -s EXPORTED_RUNTIME_METHODS='["ccall", "cwrap"]'  \
	  -O3
	mv src/pksav.mjs ../src/pksav/pksav.mjs
	mv src/pksav.wasm ../public/pksav.wasm

clean:
	rm -f src/pksav.mjs	src/pksav.wasm
