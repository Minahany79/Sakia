export interface ISingleCourse {
    name: string;
    promo: string;
    description: string;
    summary: string;
    syllabus: string;
    level: string;
    startDate: Date;
    endDate: Date;
    rating: number;
    language: string;
    category: number;
    price: number;
    tags: string[]
    tracks: number[];
    duration: number;
    peopleReviews: string;
    subject: number;
    instructors: number[];
    goals: string[];
    coverImage?: any
}

export interface ICourse {
    name: string;
    imagePath: string;
    summary: string;
    level: string;
    price: number;
    rating: number;
    promo: string;
    description: string;
    durationInHours: number;
    syllabus: string;
    startDate: Date;
    endDate: Date;
    language: string;
    id: number;
    subject: IBase;
    goals: IBase[];
    creationDate: Date;
    modificationDate: Date;
    courseStatus: string;
    peopleReview: string;
    instructors: IInstructor[];
    categories: IBase[];
    // track: any[];
    // tags: any[]
}
interface IBase {
    id: number;
    creationDate: Date;
    modificationDate: Date;
    name: string;
    description?: string;
}
interface IInstructor {
    id: number;
    creationDate: Date;
    modificationDate: Date;
    name: string;
    bio: string;
    imageProfile: string;

}

