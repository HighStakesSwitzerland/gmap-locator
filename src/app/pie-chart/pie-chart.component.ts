import {Component, Input, OnDestroy, OnInit} from "@angular/core";
import {isNil} from "lodash-es";
import {filter, Observable, Subject, takeUntil} from "rxjs";
import {Peer} from "../../lib/domain/model/peer";
import {NgxData} from "../../lib/domain/model/ngx-data";
import {ChainalysisService} from "../../lib/domain/service/chainalysis.service";

@Component({
  selector: "app-pie-chart",
  templateUrl: "./pie-chart.component.html",
  styleUrls: ["./pie-chart.component.scss"]
})
export class PieChartComponent implements OnInit, OnDestroy {
  @Input()
  peers$: Observable<Peer[]>;

  pieData: NgxData[] = [];

  private _destroy$ = new Subject();

  constructor(private readonly _chainalysisService: ChainalysisService) {
  }

  ngOnInit(): void {
    this.peers$.pipe(
      filter(v => !isNil(v)),
      takeUntil(this._destroy$)
    ).subscribe(peers => {
      this.pieData = this._chainalysisService.groupPeersByProvider(peers.slice());
    });
  }

  ngOnDestroy(): void {
    this._destroy$.next(null);
    this._destroy$.complete();
  }


}

