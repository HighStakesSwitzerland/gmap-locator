import {Component, Input, OnDestroy, OnInit} from "@angular/core";
import {isNil, remove, sortBy} from "lodash-es";
import {filter, Observable, Subject, takeUntil} from "rxjs";
import {Peer} from "../../lib/domain/peer";

@Component({
  selector: "app-pie-chart",
  templateUrl: "./pie-chart.component.html",
  styleUrls: ["./pie-chart.component.css"]
})
export class PieChartComponent implements OnInit, OnDestroy {
  @Input()
  peers$: Observable<Peer[]>;

  pieData: PieData[] = [];

  private _destroy$ = new Subject();
  private _providers = ["Amazon", "Google", "Digital", "Hetzner", "Microsoft"];

  ngOnInit(): void {
    this.peers$.pipe(
      filter(v => !isNil(v)),
      takeUntil(this._destroy$)
    ).subscribe(peers => {
      this.analyzePeers(peers.slice());
    });
  }

  ngOnDestroy(): void {
    this._destroy$.complete();
  }

  private analyzePeers(peers: Peer[]) {
    const newPieData: PieData[] = [];
    this._providers.forEach(provider => {
      let groupedPeers = remove(peers, (peer => peer.isp.startsWith(provider)));
      if (groupedPeers.length > 0) {
        newPieData.push({
          name: groupedPeers[0].isp,
          value: groupedPeers.length
        });
      }
    });
    if (peers.length > 0) {
      newPieData.push({
        name: "Others",
        value: peers.length
      });
    }
    this.pieData = sortBy(newPieData, "value").reverse();
  }

}

interface PieData {
  name: string;
  value: number;
}
