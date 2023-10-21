import { ICourse } from './../../../models/interfaces/course';
import { CourseService } from './../../../core/services/course.service';
import { Component, OnInit } from '@angular/core';
import { Table } from 'primeng/table';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
    selector: 'app-courses',
    templateUrl: './courses.component.html',
    styleUrls: ['./courses.component.scss'],
    providers: [MessageService]

})
export class CoursesComponent implements OnInit {
    // API
    courses$!: Observable<any>;
    courseModel = {} as ICourse

    // UI
    deleteCourseDialog: boolean = false;
    deleteCoursesDialog: boolean = false;
    submitted: boolean = false;

    // // Filters
    // filterModel: any = {};
    // courseTitle!: string;
    // subjectId!: number;
    // instructorIds!: number;
    // level!: string;

    constructor(private router: Router, private route: ActivatedRoute, private messageService: MessageService, private courseService: CourseService) { }

    ngOnInit() {
        this.courses$ = this.courseService.getCourses(1000, 0);
    }
    deleteCourse(course: ICourse) {
        console.log(course);
        this.deleteCourseDialog = true;
        this.courseModel = { ...course };
    }
    confirmDelete(coureId?: number) {
        this.deleteCourseDialog = false;
        // const observer = {
        //     next: (res: any) => console.log('Observer got a next value: ' + res),
        //     error: (err: Error) => console.error('Observer got an error: ' + err),
        //     complete: () => { this.courses$ = this.courseService.getCourses(1000, 0) }
        // };
        this.courseService.deleteCourse(this.courseModel.id).subscribe((res) => {
            console.log(res);
        })
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Course Deleted', life: 3000 });
        this.courseModel = {} as ICourse;
    }
    deleteSelectedCourses() {
        this.deleteCoursesDialog = true;
    }

    // approve course
    approveCourse(courseId: number, checkBtn: any) {
        switch (checkBtn.modelValue) {
            case true:
                this.courseService.approveCourse(courseId).subscribe((res) => {
                    this.messageService.add({ severity: 'success', summary: 'Approved', detail: 'Course approved successfuly', life: 3000 });
                })
                break;
            case false:
                this.messageService.add({ severity: 'warn', summary: 'Approved', detail: 'Course already approved', life: 3000 });
                break;
            default:
                break;
        }

    }
    editCourse(courseId: number) {
        this.router.navigate([`edit/${courseId}`], { relativeTo: this.route })

    }
    openNew() {
        this.router.navigate(['create'], { relativeTo: this.route })
    }

    // filter(key: string, value: any) {
    //     this.filterModel[key] = value;
    //     this.courses$ = this.courseService.getCourses(1000, 0, this.filterModel);
    // }
    // primeNg Template dummy data
    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }
}
