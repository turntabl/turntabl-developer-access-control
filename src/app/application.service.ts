import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Role } from "./role";
import { RoleRequest } from "./role-request";

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json"
  })
};

@Injectable({
  providedIn: "root"
})
export class ApplicationService {
  private permissionServiceURL = "process.env.PERMISSIONS";
  constructor(private httpClient: HttpClient) {}

  getRole(): Observable<Role[]> {
    return this.httpClient.get<Role[]>(this.permissionServiceURL + "role");
  }

  postRequest(roleRequest: RoleRequest): Observable<RoleRequest> {
    return this.httpClient.post<RoleRequest>(
      this.permissionServiceURL + "send",
      roleRequest,
      httpOptions
    );
  }
}
