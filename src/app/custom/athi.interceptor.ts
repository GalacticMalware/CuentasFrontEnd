import { HttpInterceptorFn } from "@angular/common/http";

export const authInterceptor: HttpInterceptorFn = (req, next) =>{
    //if(req.url.indexOf("Acceso")>0) return next(req);
    const token = localStorage.getItem("t") || "";
    const cloneRequest = req.clone({
        setHeaders:{
            Authorization: `Bearer ${token}`
        }
    });
    
    //debugger;
    return next(token !== "" ? cloneRequest : req);
}