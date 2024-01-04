package main

import (
	"syscall/js"

	"github.com/golang/geo/s2"
)

type CellWrapper struct {
	CellIDToken string
	RectBound   *RectWrapper
}

func (t *CellWrapper) ValueOf() js.Value {
	returned := map[string]any{}
	returned["cellIDToken"] = t.CellIDToken
	returned["rectBound"] = t.RectBound.ValueOf()
	return js.ValueOf(returned)
}

func NewCellWrapperFromCellID(cellID s2.CellID) *CellWrapper {
	c := s2.CellFromCellID(cellID)
	c.RectBound().Vertex(0)
	return &CellWrapper{
		CellIDToken: cellID.ToToken(),
		RectBound:   NewRectWrapperFromRect(c.RectBound()),
	}
}

type RectWrapper struct {
	Points [4]*PointWrapper
}

func (t *RectWrapper) ValueOf() js.Value {
	returned := map[string]any{}
	points := []any{}
	for _, point := range t.Points {
		points = append(points, point.ValueOf())
	}
	returned["points"] = points
	return js.ValueOf(returned)
}

func NewRectWrapperFromRect(rect s2.Rect) *RectWrapper {
	return &RectWrapper{
		Points: [4]*PointWrapper{
			NewPointWrapperFromLatLng(rect.Vertex(3)),
			NewPointWrapperFromLatLng(rect.Vertex(2)),
			NewPointWrapperFromLatLng(rect.Vertex(1)),
			NewPointWrapperFromLatLng(rect.Vertex(0)),
		},
	}
}

type PointWrapper struct {
	Lat float64
	Lng float64
}

func (t *PointWrapper) ValueOf() js.Value {
	returned := map[string]any{}
	returned["lat"] = t.Lat
	returned["lng"] = t.Lng
	return js.ValueOf(returned)
}

func NewPointWrapperFromLatLng(point s2.LatLng) *PointWrapper {
	return &PointWrapper{
		Lat: point.Lat.Degrees(),
		Lng: point.Lng.Degrees(),
	}
}
