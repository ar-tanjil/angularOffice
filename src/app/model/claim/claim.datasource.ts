import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, catchError } from "rxjs";
import { HttpMessage } from "../httpMessage.model";
import { Claim, ClaimCategory } from "./claim.model";

@Injectable()
export class ClaimDatasource{

    private claimUrl: string = "http://localhost:8080/claims";
    private categoryUrl: string = "http://localhost:8080/claims/category";

    constructor(private http: HttpClient){ };

    getAllClaim(): Observable<Claim[]>{
        return this.sendRequest<Claim[]>("GET", this.claimUrl);
    }

    getClaimlByEmoyeeId(id: number): Observable<Claim>{
        return this.sendRequest<Claim>("GET", `${this.claimUrl}/${id}`);
    }

    saveClaim(claim : Claim):Observable<Claim>{
        return this.sendRequest<Claim>("POST", this.claimUrl, claim);
    }


    acceptClaim(id: number): Observable<boolean>{
        return this.sendRequest<boolean>("GET", `${this.claimUrl}/approved/${id}`);
    }

    
    rejectClaim(id: number): Observable<boolean>{
        return this.sendRequest<boolean>("GET", `${this.claimUrl}/reject/${id}`);
    }

    // updateClaim(claim: Claim): Observable<Claim>{
    //     return this.sendRequest<Claim>("PUT", `${this.claimUrl}/${claim.id}`, claim);
    // }

    // delete(id: number): Observable<HttpMessage>{
    //   return this.sendRequest<HttpMessage>("DELETE", `${this.claimUrl}/${id}`);
    // }



// Category -----------------------------------

getAllClaimCategory(): Observable<ClaimCategory[]>{
    return this.sendRequest<ClaimCategory[]>("GET", this.categoryUrl);
}

// getClaimlByEmoyeeId(id: number): Observable<Claim>{
//     return this.sendRequest<Claim>("GET", `${this.categoryUrl}/${id}`);
// }

saveClaimCategory(category : ClaimCategory):Observable<ClaimCategory>{
    return this.sendRequest<ClaimCategory>("POST", this.categoryUrl, category);
}


    private sendRequest<T>(verb: string, url: string, body?: T): Observable<T>{
        return this.http.request<T>(verb, url, {
            body: body
        }).pipe(catchError((error: Response) => {
            throw(`Network Error: ${error.statusText} (${error.status})`)
        }));
    }

}