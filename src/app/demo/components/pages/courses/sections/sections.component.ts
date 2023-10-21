import { ISection } from './../../../../models/interfaces/section';
import { ICourse } from './../../../../models/interfaces/course';
import { CourseService } from './../../../../core/services/course.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-sections',
    templateUrl: './sections.component.html',
    styleUrls: ['./sections.component.scss'],
    providers: [MessageService]
})
export class SectionsComponent implements OnInit, OnDestroy {
    courseInfo = {} as ICourse
    random: number = Math.ceil(Math.random() * 1000);
    subscribers: any[] = []
    courseId!: number
    sections: string[] = ['', '']

    constructor(private activatedRoute: ActivatedRoute, private messageService: MessageService, private courseService: CourseService) {
        this.subscribers[0] = this.activatedRoute.params.subscribe(params => this.courseId = params['id'])
    }
    ngOnInit() {
        this.courseService.getSingleCourse(this.courseId).subscribe(course => this.courseInfo = course);

    }
    onAddSection() {
        this.sections.push('')
    }
    ngOnDestroy(): void {
        this.subscribers.forEach((subscription) => subscription.unsubscribe())
    }
}
