import {Component} from "@angular/core";
import {Observable} from "rxjs";
import {Chains} from "../../lib/domain/model/chains";
import {PeerService} from "../../lib/infra/repository/peer-service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  chains$: Observable<Chains>

  constructor(private readonly _peerService: PeerService) {
    this.chains$ = this._peerService.getAllPeers();
  }

}
