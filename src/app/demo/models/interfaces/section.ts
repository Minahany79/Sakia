export interface ISection {
    sectionTitle: string,
    sectionInfo: string,
    durationInHour: number
}
export interface IShowDialog {
    liveSession?: boolean,
    video?: boolean,
    reading?: boolean,

}
export interface ILiveSession {
    topic: string;
    startTime: Date;
    durationInMin: string;
    materialName: string
    sectionId: number
}
export interface IVideo {
    additionalInfo: string,
    videoUrl: string,
    durationInMin: number,
    materialName: string,
    sectionId: number
}
