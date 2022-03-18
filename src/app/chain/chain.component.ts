import {Component} from "@angular/core";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {isNil} from "lodash-es";
import {combineLatestWith, filter, ReplaySubject, Subject, takeUntil} from "rxjs";
import {Peer} from "../../lib/domain/model/peer";
import {PeerService} from "../../lib/infra/repository/peer-service";

@Component({
  selector: "app-chain",
  templateUrl: "./chain.component.html",
  styleUrls: ["./chain.component.scss"]
})
export class ChainComponent {

  peers$ = new ReplaySubject<Peer[]>();
  chain: string;

  private readonly _destroy$ = new Subject();

  constructor(private readonly _peerService: PeerService,
              private readonly _activatedRoute: ActivatedRoute,
              private readonly _router: Router) {
    this._peerService.getAllChains().pipe(
      combineLatestWith(this._router.events),
      filter(([chains, event]) => !isNil(chains) && event instanceof NavigationEnd),
      takeUntil(this._destroy$)
    ).subscribe(([chains, _]) => {
      console.log("next")
      this.chain = this._activatedRoute.snapshot.url[0].path;
      this.peers$.next(chains[this.chain]);
    });
  }

  ngOnDestroy(): void {
    this._destroy$.complete();
  }

}
