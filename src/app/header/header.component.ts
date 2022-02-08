import {Component, EventEmitter, OnDestroy, OnInit, Output} from "@angular/core";
import {SidebarService} from "../../lib/domain/service/sidebar.service";
import {FormControl} from "@angular/forms";
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output()
  public onDarkModeSwitch = new EventEmitter<boolean>();
  public darkModeControl = new FormControl(false);

  private _destroy$ = new Subject();

  constructor(private readonly _sidebarService: SidebarService) {
  }

  ngOnInit(): void {
    this.darkModeControl.valueChanges.pipe(
      takeUntil(this._destroy$)
    ).subscribe((event: boolean) => this.onDarkModeSwitch.emit(event));
  }

  toggleSidenav() {
    this._sidebarService.toggle();
  }

  ngOnDestroy(): void {
    this._destroy$.complete();
  }

}
