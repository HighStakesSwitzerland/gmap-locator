import {Component, OnDestroy, OnInit} from "@angular/core";
import {filter, map, Observable, Subject, takeUntil} from "rxjs";
import {Chains} from "../../lib/domain/model/chains";
import {PeerService} from "../../lib/infra/repository/peer-service";
import {ChainalysisService} from "../../lib/domain/service/chainalysis.service";
import {find as _find, isNil, reduce as _reduce} from "lodash-es";
import {NgxData} from "../../lib/domain/model/ngx-data";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  chains$: Observable<Chains>
  viewSize: [number, number] = [300, 400];
  cardsData: any;
  private _destroy$ = new Subject();

  constructor(private readonly _peerService: PeerService,
              private readonly _chainalysisService: ChainalysisService) {
    this.chains$ = this._peerService.getAllChains();
  }

  ngOnInit(): void {
    this.chains$.pipe(
      filter(chains => !isNil(chains)),
      map((chains: Chains) => {
        let allGrouperPeers = [];
        for (const chainId of Object.keys(chains)) {
          const items = chains[chainId];
          allGrouperPeers.push(...this._chainalysisService.groupPeersByProvider(items));
        }
        return _reduce(allGrouperPeers, (result: NgxData[], data: NgxData, key: number) => {
          let found = _find(result, (i: NgxData) => i.name === data.name);
          if (found != undefined) {
            found.value += data.value;
          } else {
            result.push(data);
          }
          return result;
        }, []);

      }),
      takeUntil(this._destroy$)
    ).subscribe((orderedData: NgxData[]) => {
      this.cardsData = orderedData.slice(0, 3);
    })
  }

  ngOnDestroy(): void {
    this._destroy$.next(null);
    this._destroy$.complete();
  }

}
