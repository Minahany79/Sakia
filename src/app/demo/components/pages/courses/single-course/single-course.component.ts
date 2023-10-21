import { Level } from './../../../../models/enums/level';
import { CourseService } from './../../../../core/services/course.service';
import { ICourse, ISingleCourse } from './../../../../models/interfaces/course';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'app-single-course',
    templateUrl: './single-course.component.html',
    styleUrls: ['./single-course.component.scss'],
    providers: [MessageService]

})
export class SingleCourseComponent implements OnInit, OnDestroy {
    // API
    courseModel = {} as ISingleCourse;
    tracks$!: Observable<any>;
    categories$!: Observable<any>;
    subjects$!: Observable<any>;
    instructors$!: Observable<any>;
    subscribers: any[] = []
    courseId!: number

    //UI
    submitted: boolean = false;
    cancelFormDialog: boolean = false
    level = Level
    formData: FormData = new FormData();
    current: Date = new Date()
    constructor(private courseService: CourseService, private activatedRoute: ActivatedRoute,
        private messageService: MessageService, private router: Router) {
    }

    ngOnInit(): void {
        this.tracks$ = this.courseService.getTracks(1000, 0);
        this.categories$ = this.courseService.getCategories();
        this.subjects$ = this.courseService.getSubjects();
        this.instructors$ = this.courseService.getInstructors()
        this.subscribers[0] = this.activatedRoute.params.subscribe(params => this.courseId = params['id'])
        if (this.courseId) {
            this.getCourseData(this.courseId)
        }
    }
    // create course
    handleSaveCourse() {
        const { name, tracks, promo, description, subject, summary, goals, syllabus, level, duration, startDate, endDate, language, category, price, instructors, tags, } = this.courseModel
        if (name && promo && description && subject && summary && syllabus && level && duration && startDate && endDate && language && category && price && instructors) {
            Object.entries(this.courseModel).forEach((keyValue) => {
                this.formData.append(keyValue[0], keyValue[1])
            })
            // todo checker for formData
            this.submitted = true;
            this.courseId ? this.editCourse(this.courseId, this.formData) : this.createCourse(this.formData)
        }
        else {
            console.log(this.courseModel)
            this.messageService.add({ severity: 'warn', summary: 'Unsuccessful', detail: 'Required Course Details!', life: 3000 })
        }
    }
    handleGoals(fun: string, index: number) {
        if (fun === 'create') {
            this.courseModel.goals ? this.courseModel.goals.push('') : this.courseModel.goals = ['']
        }
        else if (fun === 'remove') {
            this.courseModel.goals.splice(index, 1);
        }
    }
    handleTags(fun: string, index: number) {
        if (fun === 'create') {
            this.courseModel.tags ? this.courseModel.tags.push('') : this.courseModel.tags = ['']
        }
        else if (fun === 'remove') {
            this.courseModel.tags.splice(index, 1);
        }
    }
    handleTextarea(event: Event, target: string, i: number) {
        switch (target) {
            case 'goals':
                this.courseModel.goals[i] = (event.target as HTMLInputElement).value
                break;
            case 'tags':
                this.courseModel.tags[i] = (event.target as HTMLInputElement).value
                break;
            default:
                break;
        }
    }
    handleAppendImg(event: any) {
        this.formData.append('coverImage', event.files[0])
    }
    handleCancel() {
        this.submitted = false;
        this.router.navigate(['./pages/courses'])
    }
    getCourseData(courseId: number) {
        this.subscribers[1] = this.courseService.getSingleCourse(courseId).pipe(map((course: ICourse) => {
            let instructors = course.instructors.map((instructor) => instructor.id)
            let goals = course.goals.map((goal) => goal.name)
            console.log(course)
            return {
                name: course.name,
                promo: course.promo,
                description: course.description,
                summary: course.summary,
                syllabus: course.syllabus,
                level: course.level,
                startDate: course.startDate,
                endDate: course.endDate,
                rating: course.rating,
                language: course.language,
                category: course.categories[0].id,
                price: course.price,
                duration: course.durationInHours,
                peopleReviews: course.peopleReview,
                subject: course.subject.id,
                // goals,
                instructors
            }
        })).subscribe((res: any) => {
            this.courseModel = res
        })
    }
    createCourse(courseData: FormData) {
        this.courseService.createCourse(courseData).subscribe((res) => {
            // this.courseModel = {} as ICourse
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Course Created Successfuly!', life: 3000 })
        })
    }
    editCourse(courseId: number, courseData: FormData) {
        this.courseService.editCourse(courseId, courseData).subscribe((res) => {
            // this.courseModel = {} as ICourse
            console.log(res)
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Course Created Successfuly!', life: 3000 })
        })
    }
    ngOnDestroy(): void {
        this.subscribers.forEach((subscription) => subscription.unsubscribe())
    }
}

