import {Component} from "@angular/core";
import {Observable} from "rxjs";
import {Chains} from "../../lib/domain/chains";
import {PeerService} from "../../lib/infra/peer-service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  chains$: Observable<Chains>

  constructor(private readonly _peerService: PeerService) {
    this.chains$ = this._peerService.getAllPeers();
  }

}
