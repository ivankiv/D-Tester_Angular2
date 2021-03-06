import { Http, Headers, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import 'rxjs/add/observable/throw';

@Injectable()
export class ApiService {
    headers: Headers = new Headers({
        'Content-Type': 'application/json',
        Accept: 'application/json'
    });

    api_url: string = 'http://dtapi.local';

    constructor(private http: Http) {}

    private getJson(response: Response) {
        return response.json();
    }

    private checkForError(response: Response): Response {
        if(response.status >= 200 && response.status < 300) {
            return response
        } else {
            var error = new Error(response.statusText);
            error['response'] = response;
            console.error('Error from service', error);
            throw error;
        }
    }

    getItem(path: string): Observable<any> {
        return this.http.get(`${this.api_url}${path}`, {headers: this.headers})
            .map(this.checkForError)
            .catch(err => Observable.throw(err))
            .map(this.getJson)
    }

    postItem(path: string, data:any): Observable<any> {
        return this.http.post(
            `${this.api_url}${path}`, JSON.stringify(data), {headers: this.headers})
            .map(this.checkForError)
            .catch(err => Observable.throw(err))
            .do((response) => console.log("postItem message", response))
            .map(this.getJson)
    }

    deleteItem(path: string, id: any): Observable<any> {
        return this.http.delete(`${this.api_url}${path}${id}`, {headers: this.headers})
            .map(this.checkForError)
            .catch(err => Observable.throw(err))
            .do((response) => console.log(response))
            .map(this.getJson)
    }
}