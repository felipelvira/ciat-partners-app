import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';


let partners = JSON.parse(localStorage.getItem('partners')) || [];

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const { url, method, headers, body } = request;

        return of(null)
            .pipe(mergeMap(handleRoute))
            .pipe(materialize())
            .pipe(delay(500))
            .pipe(dematerialize());

        function handleRoute() {
            switch (true) {
                case url.endsWith('/partners/create') && method === 'POST':
                    return create();
                case url.endsWith('/partners') && method === 'GET':
                    return getAll();
                case method === 'DELETE':
                    return deleteUser();
                default:
                    // pass through any requests not handled above
                    return next.handle(request);
            }
        }

        // route functions

        function create() {
            const partner = body;
            if (partner.is_branch) {

                if (partners.find(x => x.country === partner.country && x.city === partner.city)) {
                    return error(`Partner ${partner.name} can't be added, please change partner location.`)
                } else {
                    partner.id = partners.length ? Math.max(...partners.map(x => x.id)) + 1 : 1;
                    partners.push(partner);
                    localStorage.setItem('partners', JSON.stringify(partners));
                    return ok();

                }
            } else if (partners.find(x => x.name === partner.name || x.acronym === partner.acronym) && !partner.headquarter) {
                let foundPartnert = partners.find(x => x.name === partner.name || x.acronym === partner.acronym)
                return error(`Partner ${partner.name} can't be added, name or acronym already taken.`)

            }
        }

        function getAll() {
            return ok(partners)
        }
        function deleteUser() {
            let expl = url.split('/');
            const id = expl[expl.length - 1];
            const row = partners.find(x => x.id === parseInt(id));
            let tmpPartners = partners;
            tmpPartners.splice(partners.indexOf(row), 1)
            localStorage.setItem('partners', JSON.stringify(tmpPartners));
            return ok(tmpPartners)
        }


        // helper functions

        function ok(body?) {
            return of(new HttpResponse({ status: 200, body }))
        }
        function error(message) {
            return throwError({ error: message });
        }

    }
}

export const fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};