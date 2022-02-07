import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {isNil} from "lodash-es";
import {combineLatestWith, filter, Subject, takeUntil} from "rxjs";
import {Peer} from "../../lib/domain/model/peer";
import {PeerService} from "../../lib/infra/repository/peer-service";

@Component({
  selector: "app-chain",
  templateUrl: "./chain.component.html",
  styleUrls: ["./chain.component.scss"]
})
export class ChainComponent implements OnInit {

  peers$: Subject<Peer[]> = new Subject();
  chain: string;

  private readonly navChanged$ = new Subject();
  private readonly _destroy$ = new Subject();

  constructor(private readonly _peerService: PeerService,
              private readonly _activatedRoute: ActivatedRoute,
              private readonly _router: Router) {

    this._router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        takeUntil(this._destroy$)
      )
      .subscribe(value => {
          this.chain = this._activatedRoute.snapshot.url[0].path;
          this.navChanged$.next(undefined);
        }
      );

    this._peerService.getAllPeers().pipe(
      combineLatestWith(this.navChanged$),
      filter(([chains, _]) => !isNil(chains)),
      takeUntil(this._destroy$)
    ).subscribe(([chains, _]) => {
      this.peers$.next(chains[this.chain]);
    });
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this._destroy$.complete();
  }

}
