import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {ChainComponent} from "./chain/chain.component";
import {HomeComponent} from "./home/home.component";

const routes: Routes = [
  {path: "", component: HomeComponent},
  {path: "**", component: ChainComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
