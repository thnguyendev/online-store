import { Component, Input, ViewEncapsulation } from "@angular/core";

@Component({
  selector: 'location-component',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class LocationComponent {
  @Input() address?: string;
  @Input() phone?: string;
  @Input() email?: string;
}