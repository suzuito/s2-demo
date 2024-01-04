DIST_DIR=../s2-demo-angular/src/assets
all: ${DIST_DIR}/main.wasm ${DIST_DIR}/wasm_exec.js
${DIST_DIR}/main.wasm: *.go
	GOOS=js GOARCH=wasm go build -o ${DIST_DIR}//main.wasm *.go
${DIST_DIR}/wasm_exec.js: $(shell go env GOROOT)/misc/wasm/wasm_exec.js
	cp $(shell go env GOROOT)/misc/wasm/wasm_exec.js ${DIST_DIR}/

clean:
	rm ${DIST_DIR}/main.wasm ${DIST_DIR}/wasm_exec.js