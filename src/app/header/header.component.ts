import {Component} from "@angular/core";
import {SidebarService} from "../../lib/domain/service/sidebar.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(private readonly _sidebarService: SidebarService) {
  }

  toogleSidenav() {
    this._sidebarService.toggle();
  }

}
