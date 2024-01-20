package main

import (
	"github.com/golang/geo/s2"
	"github.com/paulmach/orb"
)

func NewGeoJSONPointFromS2Point(point s2.Point) *orb.Point {
	ll := s2.LatLngFromPoint(point)
	return &orb.Point{ll.Lng.Degrees(), ll.Lat.Degrees()}
}
func NewGeoJSONPolygonFromS2CellID(cellID s2.CellID) *orb.Polygon {
	return NewGeoJSONPolygonFromS2Cell(s2.CellFromCellID(cellID))
}

func NewGeoJSONPolygonFromS2Cell(c s2.Cell) *orb.Polygon {
	polygon := orb.Polygon{}
	ring := orb.Ring{}
	for i := 3; i >= 0; i-- { // Note range over 4 verticies by clockwise order
		ll := s2.LatLngFromPoint(c.Vertex(i))
		ring = append(ring, orb.Point{ll.Lng.Degrees(), ll.Lat.Degrees()})
	}
	ring = append(ring, ring[0])
	polygon = append(polygon, ring)
	return &polygon
}
