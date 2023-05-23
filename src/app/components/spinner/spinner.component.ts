import { Component, ViewEncapsulation } from "@angular/core";
import { SpinnerService } from "src/app/services/spinner.service";

@Component({
  selector: 'spinner-component',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SpinnerComponent {
  isLoading$: any;

  constructor(private spinnerService: SpinnerService) { }

  ngOnInit() {
    this.isLoading$ = this.spinnerService.isLoading$;
  }
}