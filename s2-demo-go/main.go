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
	s2o.Set("CellLevel", js.FuncOf(func(this js.Value, args []js.Value) any {
		cellIDToken := args[0].String()
		cell := s2.CellFromCellID(s2.CellIDFromToken(cellIDToken))
		return js.ValueOf(cell.Level())
	}))
	s2o.Set("CellGetChildren", js.FuncOf(func(this js.Value, args []js.Value) any {
		cellIDToken := args[0].String()
		cell := s2.CellFromCellID(s2.CellIDFromToken(cellIDToken))
		children, _ := cell.Children()
		childrenJS := []any{}
		for _, child := range children {
			childrenJS = append(childrenJS, NewCellWrapperFromCellID(child.ID()).ValueOf())
		}
		return js.ValueOf(childrenJS)
	}))
	blocker := make(chan struct{})
	<-blocker
}
