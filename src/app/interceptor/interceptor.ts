import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable()
export class Interceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // const hardcodedToken = '1d38d128-0671-4121-8084-f6332a992a40';
        if (localStorage.getItem('access-token') != null) {
            const token = localStorage.getItem('access-token');
            // if the token is  stored in localstorage add it to http header
            const headers = new HttpHeaders().set("access-token", token);
            //clone http to the custom AuthRequest and send it to the server 
            const AuthRequest = req.clone({ headers: headers });
            return next.handle(AuthRequest)
        } else {
            return next.handle(req);
        }
    }

}