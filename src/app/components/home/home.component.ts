import { Component, ViewEncapsulation } from "@angular/core";
import { ProfileService } from "@app/services/profile.service";

@Component({
  selector: 'home-component',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HomeComponent {
  profile: any;

  constructor(private profileService: ProfileService) {}

  ngOnInit() {
    this.profileService.getProfile().subscribe(res => this.profile = res);
  }
}