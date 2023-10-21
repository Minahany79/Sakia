import { ICourse } from './../../models/interfaces/course';
import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders, } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, catchError, throwError, retry } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CourseService {
    httpOption;
    constructor(private httpClient: HttpClient) {
        this.httpOption = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                // 'Content-Type': 'multipart/form-data',
            }),
        };
    }
    getCourses(pageSize: number = 10, pageNumber: number = 0, filters?: any, status: string = 'Pending Approval'): Observable<any> {
        return this.httpClient.get(`${environment.rootUrl}/api/v1/Courses`, { params: { pageNumber, pageSize, ...filters, } });
    }
    getSingleCourse(courseId: number): Observable<any> {
        return this.httpClient.get(`${environment.rootUrl}/api/v1/Courses/${courseId}`);
    }
    createCourse(courseData: any): Observable<any> {
        return this.httpClient.post(`${environment.rootUrl}/api/v1/Courses`, courseData)
    }
    editCourse(courseId: number, courseData: any) {
        return this.httpClient.put(`${environment.rootUrl}/api/v1/Courses/${courseId}`, courseData)
    }
    deleteCourse(courseId?: number) {
        return this.httpClient.delete(`${environment.rootUrl}/api/v1/Courses/${courseId}`)
    }

    getTracks(pageSize: number = 10, pageNumber: number = 0,): Observable<any> {
        return this.httpClient.get(`${environment.rootUrl}/api/v1/Tracks`, { params: { pageNumber, pageSize } });
    }
    getCategories(): Observable<any> {
        return this.httpClient.get(`${environment.rootUrl}/api/v1/Categories`);
    }
    getSubjects(): Observable<any> {
        return this.httpClient.get(`${environment.rootUrl}/api/v1/Courses/Subjects`);
    }

    getInstructors(pageSize: number = 100, pageNumber: number = 0,): Observable<any> {
        return this.httpClient.get(`${environment.rootUrl}/api/v1/Instructors`, { params: { pageNumber, pageSize } });
    }
    approveCourse(courseId: number) {
        return this.httpClient.put(`${environment.rootUrl}/api/v1/Courses/${courseId}/Approve`, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }
}
