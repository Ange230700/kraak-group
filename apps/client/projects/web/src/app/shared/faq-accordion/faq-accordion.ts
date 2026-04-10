import { Component, Input } from '@angular/core';
import {
  Accordion,
  AccordionContent,
  AccordionHeader,
  AccordionPanel,
} from 'primeng/accordion';

export interface FaqItem {
  question: string;
  answer: string;
}

@Component({
  selector: 'kraak-faq-accordion',
  standalone: true,
  imports: [Accordion, AccordionPanel, AccordionHeader, AccordionContent],
  templateUrl: './faq-accordion.html',
})
export class FaqAccordion {
  @Input({ required: true }) items: FaqItem[] = [];
}
