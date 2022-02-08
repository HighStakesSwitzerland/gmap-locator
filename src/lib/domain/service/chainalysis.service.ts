import { Injectable } from '@angular/core';
import {Peer} from "../model/peer";
import {remove, sortBy} from "lodash-es";
import {NgxData} from "../model/ngx-data";

@Injectable({
  providedIn: 'root'
})
export class ChainalysisService {
  private _providers = ["Amazon", "Google", "Digital", "Hetzner", "Microsoft"];

  public groupPeersByProvider(peers: Peer[]) : NgxData[] {
    const newPieData: NgxData[] = [];
    this._providers.forEach(provider => {
      let groupedPeers = remove(peers, (peer => peer.isp.startsWith(provider)));
      if (groupedPeers.length > 0) {
        newPieData.push({
          name: groupedPeers[0].isp,
          value: groupedPeers.length
        });
      }
    });
    if (peers?.length > 0) {
      newPieData.push({
        name: "Others",
        value: peers.length
      });
    }
    return sortBy(newPieData, "value").reverse();
  }

}
