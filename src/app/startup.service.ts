import { Injectable, Injector } from "@angular/core";
import { ServiceLocator } from "./common/serviceLocator";
import { Store } from "@ngrx/store";
import { AppStates } from "./store/app-state";
import { LoadBearerTokenAction } from "./store/actions/session.action";
import { SetUserAction } from "./store/actions/user.action";
import { ActivatedRoute, Router } from "@angular/router";
import { first, map } from "rxjs/operators";

@Injectable({
  providedIn: 'root',
})
export class StartupService {
  // Define valid redirectable paths based on your app.routes.ts
  private validRedirectPaths = ['home', 'order', 'brand', 'member'];

  constructor(
    private injector: Injector,
    private store: Store<AppStates>,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    ServiceLocator.injector = injector;
  }

  public async init(): Promise<void> {
    // this.initBearerToken();
    this.processQueryParam();
    console.log("Init app success");
  }

  public initBearerToken(){
    const bearerToken = localStorage.getItem("BearerToken") || "";
    this.store.dispatch(LoadBearerTokenAction({bearerToken}));

    const user = localStorage.getItem("User") || "{}";
    const parseUser = JSON.parse(user);
    this.store.dispatch(SetUserAction({user : {username : parseUser.Username, role : parseUser.Role}}));
  }

  public processQueryParam(): void {
    this.activatedRoute.queryParamMap.pipe(
      first(), // Take only the first emission (initial query params)
      map(params => params.get('redirect_to'))
    ).subscribe(redirectToPath => {
      if (redirectToPath && this.validRedirectPaths.includes(redirectToPath)) {
        console.log(`StartupService: Query param 'redirect_to=${redirectToPath}' found. Navigating...`);
        this.router.navigate([`/${redirectToPath}`]);
      } else if (redirectToPath) {
        console.warn(`StartupService: Query param 'redirect_to=${redirectToPath}' is not a valid or recognized redirect path.`);
      }
    });
  }
}
