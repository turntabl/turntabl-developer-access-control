import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Role } from "./role";
import { RoleRequest } from "./role-request";
import { CookieService } from "ngx-cookie-service";

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json"
  })
};

@Injectable({
  providedIn: "root"
})
export class ApplicationService {
  private permissionsURL: string;

  constructor(
    private httpClient: HttpClient,
    private cookieService: CookieService
  ) {
    this.permissionsURL = this.cookieService.get("backend_url");
  }
  getRoles(): Observable<Role[]> {
    return this.httpClient.get<Role[]>(this.permissionsURL + "roles");
  }

  postRequest(roleRequest: RoleRequest): Observable<RoleRequest> {
    return this.httpClient.post<RoleRequest>(
      this.permissionsURL + "send",
      roleRequest,
      httpOptions
    );
  }
}
