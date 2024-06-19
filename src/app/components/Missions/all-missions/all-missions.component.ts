import { Component, inject } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { HeaderMissionComponent } from '../../../shared/header-mission/header-mission.component';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { RatingModule } from 'primeng/rating';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DividerModule } from 'primeng/divider';
import { ProgressBarModule } from 'primeng/progressbar';
import { ICity, ICountry, IMission, ISkill, ITheme, MissionSorting } from '../../../Interface/mission';
import { AllMissionService } from '../Service/all-mission.service';
import { ActivatedRoute } from '@angular/router';
import { DropdownModule } from 'primeng/dropdown';
import { isPromise } from 'util/types';


@Component({
  selector: 'app-all-missions',
  standalone: true,
  imports: [MenubarModule, HeaderMissionComponent, CardModule, ButtonModule, DropdownModule, RatingModule, ReactiveFormsModule, FormsModule, DividerModule, ProgressBarModule],
  templateUrl: './all-missions.component.html',
  styleUrl: './all-missions.component.css'
})
export class AllMissionsComponent {

  // for rating
  value!: number;
  route = inject(ActivatedRoute)
  missionList: IMission[] = [];
  prevMissionList: IMission[] = [];
  missionService = inject(AllMissionService);
  sortings: MissionSorting[] | undefined;
  formGroupFilter!: FormGroup;
  activeView: string = 'grid'; // Default view
  cityList: ICity[] = []
  countryList: ICountry[] = []
  themeList: ITheme[] = []
  skillsList: ISkill[] = []
  country: number = 0
  city: number = 0
  missionTheme: string = ""
  missionSkills: string = ""
  sortingOption: number = 0
  selectedSortingOption: number = 0
  setView(view: string) {
    this.activeView = view;
  }
  filterTagList: { [key: string]: string[] } = {
    country: [],
    city: [],
    missionSkills: [],
    missionTheme: []
  };

  selectedCity: number = 0
  selectedCountry: number = 0
  selectedTheme: string = ""
  selectedSkill: string = ""


  recieveData(data: IMission[]) {

    this.missionList = data;

  }

  sortingMission(): void {

    this.selectedSortingOption = this.formGroupFilter.get('selectedSorting')?.value ?? 0;
    if (this.selectedSortingOption) {
      this.missionService.getMission(this.country, this.city, "", "", this.selectedSortingOption).subscribe(
        {
          next: (response) => {
            if (response.isSuccess) {
              this.missionList = response.data;


            }
          },
          error: (error) => {
            console.error('Error fetching missions:', error);
          }


        }
      );
    }
  }

  recieveFilterTagData(data: { [key: string]: string[] }) {

    this.filterTagList = data;
  }

  recieveSelectedCity(data: number) {
    this.selectedCity = data;
  }
  recieveSelectedCountry(data: ICountry[]) {
    this.countryList = data;
  }
  recieveSelectedTheme(data: string) {
    this.selectedTheme = data;
  }
  recieveSelectedSkill(data: string) {
    this.selectedSkill = data;
  }
  removeFilter(filterType: string, filterValue: string): void {

    debugger;
    this.filterTagList[filterType] = this.filterTagList[filterType].filter(f => f !== filterValue);
    if (filterType == 'country') {
      this.missionList = this.missionList.filter(f => f.country != filterValue);
    }
    if (filterType == 'city') {
      this.missionList = this.missionList.filter(f => f.city != filterValue);
    }
    if (filterType == 'missionTheme') {
      this.missionList = this.missionList.filter(f => f.missionTheme != filterValue);
    }
    if (filterType == 'missionTheme') {
      this.missionList = this.missionList.filter(f => f.missionSkills != filterValue);
    }

    const tagCountry = this.filterTagList['country'][0]
    console.log("000000")
    console.log(tagCountry)
    let currentCountry = this.countryList.filter(f => f.name == tagCountry)[0]['value'];
    console.log(currentCountry)
    console.log(this.countryList)
    if (this.filterTagList['country'].length == 1 && this.filterTagList['city'].length == 0 && this.filterTagList['missionTheme'].length == 0 && this.filterTagList['missionTheme'].length == 0) {
      this.missionService.getMission(currentCountry, this.selectedCity, this.selectedTheme, this.selectedSkill, this.sortingOption).subscribe(
        {
          next: (response) => {
            if (response.isSuccess) {
              this.missionList = response.data;
            }
          },
          error: (error) => {
            console.error('Error fetching missions:', error);
          }
        }
      );
    }

    if (this.filterTagList['country'].length == 0 && this.filterTagList['city'].length == 0 && this.filterTagList['missionTheme'].length == 0 && this.filterTagList['missionTheme'].length == 0) {
      this.missionService.getMission(0, 0, "", "", 0).subscribe(
        {
          next: (response) => {
            if (response.isSuccess) {
              this.missionList = response.data;
            }
          },
          error: (error) => {
            console.error('Error fetching missions:', error);
          }
        }
      );
    }
    console.log(this.filterTagList)


  }

  ngOnInit(): void {



    this.sortings = [
      { value: 1, name: 'Newest' },
      { value: 2, name: 'Oldest' },
      { value: 3, name: 'Lowest available seats' },
      { value: 4, name: 'Highest available seats' },
      { value: 5, name: 'Sort by my favourite' },
      { value: 6, name: 'Sort by deadline' },
    ]
    this.formGroupFilter = new FormGroup({
      selectedSorting: new FormControl<MissionSorting | null>(null)
    })


    const countryString = this.route.snapshot.queryParamMap.get('country') ?? 0;
    this.country = countryString ? Number(countryString) : 0;
    const cityString = this.route.snapshot.queryParamMap.get('city') ?? 0;
    this.city = cityString ? Number(cityString) : 0;
    this.missionTheme = this.route.snapshot.queryParamMap.get('theme') ?? '';
    this.missionSkills = this.route.snapshot.queryParamMap.get('skill') ?? '';
    this.sortingOption = parseInt(this.route.snapshot.queryParamMap.get('sortingOption') ?? '0', 10);


    this.missionService.getMission(this.country, this.city, this.missionTheme, this.missionSkills, this.sortingOption).subscribe(
      {
        next: (response) => {
          if (response.isSuccess) {
            this.missionList = response.data;
          }
        },
        error: (error) => {
          console.error('Error fetching missions:', error);
        }
      }
    );
  }


}
