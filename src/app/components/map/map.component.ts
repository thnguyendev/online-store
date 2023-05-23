import { AfterViewInit, Component, ElementRef, Input, ViewChild, ViewEncapsulation } from "@angular/core";
import { Style, Fill, Circle } from 'ol/style';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import VectorSource from 'ol/source/Vector';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import VectorLayer from 'ol/layer/Vector';
import * as proj from 'ol/proj';

@Component({
  selector: 'map-component',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class MapComponent implements AfterViewInit {
  @Input() address?: string;
  @Input() latitude?: number;
  @Input() longitude?: number;
  @ViewChild('map') mapElement?: ElementRef;
  tooltip = {
    top: 0,
    left: 0,
    content: '',
    off: true,
  };
  map?: Map;

  ngAfterViewInit() {
    let coordinate = proj.fromLonLat([this.longitude ?? 0, this.latitude ?? 0]);
    this.map = new Map({
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      target: this.mapElement?.nativeElement,
      view: new View({
        center: coordinate,
        zoom: 16,
      }),
    });
    let marker = new Feature({
      geometry: new Point(coordinate)
    });
    marker.setStyle(new Style({
      image: new Circle({
        radius: 8,
        fill: new Fill({
          color: '#448aff'
        }),
      })
    }));
    let markerLayer = new VectorLayer({
      visible: true,
      source: new VectorSource({
        features: [marker]
      }),
    });
    this.map.addLayer(markerLayer);
  }

  showTooltip(event: UIEvent | { clientX: number; clientY: number; }) {
    const pixel = this.map?.getEventPixel(event);
    if (pixel) {
      const feature = this.map?.forEachFeatureAtPixel(pixel, _feature => _feature);
      if (feature) {
        this.tooltip.content = this.address ?? '';
        this.tooltip.left = pixel[0] + this.mapElement?.nativeElement.offsetLeft;
        this.tooltip.top = pixel[1] + this.mapElement?.nativeElement.offsetTop + 16;
        this.tooltip.off = false;
      }
      else
        this.hideTooltip();
    }
  }

  hideTooltip() {
    this.tooltip.off = true;
  }
}