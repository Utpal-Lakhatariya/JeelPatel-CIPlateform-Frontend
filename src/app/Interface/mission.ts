export interface IMission {
    missionTitle:string
    misionShortDescription:string
    missionDescription:string
    country:string
    city:string
    missionOrganisationName:string
    missionOrganisationDetail:string
    missionStartDate:Date
    missionEndDate:Date
    missionType:number
    totalSeats:number
    missionRating:number
    missionRatingCount:number
    missionRegistrationDeadline:Date
    missionTheme:string
    missionSkills:string
    missionAvailability:string
    image:string
}

export interface MissionSorting {
  value: number;
  name : string;
}

export interface ICity{
    value:number;
    name: string
}
export interface ICountry {
    value: number;
    name: string;
  }
  
  export interface ISkill {
    value: number;
    name: string;
  }
  
  export interface ITheme {
    value: number;
    name: string;
  }

  export interface IGetCreateMission{
    country:[]
    theme:[]
    skill:[]
}


export interface ICreateMission{
    missionTitle:string
    missionDescription:string
    country:number
    city:number
    missionOrganisationName:string
    missionOrganisationDetail:string
    missionStartDate:Date
    missionEndDate:Date
    totalSeats:number
    missionRegistrationDeadline:Date
    missionTheme:string
    missionSkills:string
    // missionAvailability:string
    // image?:string
    // video?:string
}
