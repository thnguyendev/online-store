import { AfterViewInit, Component, ElementRef, ViewChild, ViewEncapsulation } from "@angular/core";
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
  selector: 'contact-component',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ContactComponent implements AfterViewInit {
  @ViewChild('map') map?: ElementRef;

  ngAfterViewInit() {
    let map = new Map({
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      target: this.map?.nativeElement,
      view: new View({
        center: proj.fromLonLat([109.1812897, 12.2424043]),
        zoom: 17,
      }),
    });
    let markerFeature = new Feature({
      geometry: new Point(proj.fromLonLat([109.1812897, 12.2424043]))
    });
    markerFeature.setStyle(new Style({
      image: new Circle({
        radius: 6,
        fill: new Fill({
          color: '#448aff'
        }),
      })
    }));
    let markerLayer = new VectorLayer({
      visible: true,
      source: new VectorSource({
        features: [markerFeature]
      }),
    });
    map.addLayer(markerLayer);
  }
}