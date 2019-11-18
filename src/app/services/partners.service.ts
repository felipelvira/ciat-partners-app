import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Partner } from '../models/partner.model';

let config = {
    apiUrl: '/test-API'
};

@Injectable({ providedIn: 'root' })
export class PartnersService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<Partner[]>(`${config.apiUrl}/partners`);
    }
    getCountries() {
        return this.http.get<Partner[]>(`https://restcountries.eu/rest/v2/all`);
    }

    getById(id: number) {
        return this.http.get(`${config.apiUrl}/partners/${id}`);
    }

    create(partner: Partner) {
        return this.http.post(`${config.apiUrl}/partners/create`, partner);
    }

    delete(id: number) {
        return this.http.delete(`${config.apiUrl}/partners/${id}`);
    }
}