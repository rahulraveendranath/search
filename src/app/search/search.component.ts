import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import * as _ from 'underscore';
import { SearchService } from '../search.service';
import { Profile } from './profile';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  @Input()
  value: string = "";
  profiles: Profile[] = [];
  @ViewChild('searchBox')
  input!: ElementRef;
  constructor(private serachService: SearchService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadSearchResultPage = _.debounce(this.loadSearchResultPage, 1000);
    this.route.queryParams.subscribe(params => {
      this.value = params['q'];
      this.search();
    });

  }
  /*Invokes the api on init and pass the value */
  search() {
    if (this.value) {
      this.serachService
        .searchProfiles(this.value)
        .subscribe(profiles => (this.profiles = profiles));
    } else {
      this.profiles = [];
    }
    this.setFocusToSearchField();
  }
  setFocusToSearchField() {
    if (this.input) {
      let elem = this.input.nativeElement;
      if (elem != null) {
        if (elem.createTextRange) {
          var range = elem.createTextRange();
          range.move('character', this.value.length);
          range.select();
        }
        else {
          if (elem.selectionStart) {
            elem.focus();
            elem.setSelectionRange(0, this.value.length);
          }
          else
            elem.focus();
        }
      }
    }
  }
  /* Refresh the screen with new search query */
  loadSearchResultPage() {
    location.assign(window.location.origin + "/?q=" + this.value)
  }
}
