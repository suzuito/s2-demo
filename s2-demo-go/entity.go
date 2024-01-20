package main

import (
	"encoding/json"
	"syscall/js"

	"github.com/golang/geo/s2"
	"github.com/paulmach/orb/geojson"
)

func toJsValueMap(v any) js.Value {
	m := map[string]any{}
	b, err := json.Marshal(v)
	if err != nil {
		return js.ValueOf(map[string]any{})
	}
	if err := json.Unmarshal(b, &m); err != nil {
		return js.ValueOf(map[string]any{})
	}
	return js.ValueOf(m)
}

type CellWrapper struct {
	CellIDToken string           `json:"tokenId"`
	Center      *geojson.Feature `json:"center"`
	Vertecies   *geojson.Feature `json:"vertecies"`
	Level       int              `json:"level"`
}

func (t *CellWrapper) ValueOf() js.Value {
	return toJsValueMap(t)
}

func NewCellWrapperFromCellID(cellID s2.CellID) *CellWrapper {
	c := s2.CellFromCellID(cellID)
	return &CellWrapper{
		CellIDToken: cellID.ToToken(),
		Center:      geojson.NewFeature(NewGeoJSONPointFromS2Point(c.Center())),
		Vertecies:   geojson.NewFeature(NewGeoJSONPolygonFromS2Cell(c)),
		Level:       c.Level(),
	}
}
