import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import {
  IonIcon,
  IonLabel,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from '@ionic/angular/standalone';
import { TabsLayout } from './tabs.layout';

describe('TabsLayout', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabsLayout],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [{ provide: ActivatedRoute, useValue: {} }],
    })
      .overrideComponent(TabsLayout, {
        remove: {
          imports: [IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel],
        },
        add: { schemas: [CUSTOM_ELEMENTS_SCHEMA] },
      })
      .compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(TabsLayout);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render four tab buttons', () => {
    const fixture = TestBed.createComponent(TabsLayout);
    fixture.detectChanges();
    const buttons = fixture.nativeElement.querySelectorAll('ion-tab-button');
    expect(buttons.length).toBe(4);
  });

  it('should display correct tab labels', () => {
    const fixture = TestBed.createComponent(TabsLayout);
    fixture.detectChanges();
    const labels = Array.from(
      fixture.nativeElement.querySelectorAll('ion-label'),
    ) as HTMLElement[];
    const texts = labels.map((l) =>
      l.innerHTML.replace(/<!--.*?-->/g, '').trim(),
    );
    expect(texts).toEqual(['Accueil', 'Programmes', 'Annonces', 'Support']);
  });
});
