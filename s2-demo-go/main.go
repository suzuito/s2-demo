package main

import (
	"syscall/js"

	"github.com/golang/geo/s2"
)

func main() {
	js.Global().Set("s2", js.ValueOf(map[string]any{}))
	s2o := js.Global().Get("s2")
	s2o.Set("NewCellFromFace", js.FuncOf(func(this js.Value, args []js.Value) any {
		face := args[0].Int()
		return NewCellWrapperFromCellID(
			s2.CellIDFromFace(face),
		).ValueOf()
	}))
	blocker := make(chan struct{})
	<-blocker
}
