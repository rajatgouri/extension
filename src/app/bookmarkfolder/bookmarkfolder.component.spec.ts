import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookmarkfolderComponent } from './bookmarkfolder.component';

describe('BookmarkfolderComponent', () => {
  let component: BookmarkfolderComponent;
  let fixture: ComponentFixture<BookmarkfolderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookmarkfolderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookmarkfolderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
