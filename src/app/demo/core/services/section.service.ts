import { ILiveSession, ISection, IVideo } from './../../models/interfaces/section';
import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders, } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, catchError, throwError, retry } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SectionService {
    httpOption;
    constructor(private httpClient: HttpClient) {
        this.httpOption = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                // 'Content-Type': 'multipart/form-data',
            }),
        };
    }
    createSection(sectionData: ISection, courseId: number): Observable<any> {
        return this.httpClient.post(`${environment.rootUrl}/api/v1/Courses/${courseId}/sections`, JSON.stringify(sectionData), this.httpOption)
    }
    createLiveSession(sessionData: ILiveSession): Observable<any> {
        return this.httpClient.post(`${environment.rootUrl}/api/v1/LiveSessions`, JSON.stringify(sessionData), this.httpOption)
    }
    createVideo(videoData: IVideo): Observable<any> {
        return this.httpClient.post(`${environment.rootUrl}/api/v1/Videos`, JSON.stringify(videoData), this.httpOption)
    }
}
