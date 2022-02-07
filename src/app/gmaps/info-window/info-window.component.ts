import {Component, Input, OnInit} from "@angular/core";
import {PeerMapMarker} from "../../../lib/domain/model/peer-map-marker";

@Component({
  selector: "app-info-window",
  templateUrl: "./info-window.component.html",
  styleUrls: ["./info-window.component.scss"]
})
export class InfoWindowComponent implements OnInit {

  @Input()
  marker: PeerMapMarker;

  constructor() {
  }

  ngOnInit(): void {
  }

}
