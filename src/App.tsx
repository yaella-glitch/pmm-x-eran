import { ContentProvider } from "./ContentContext";
import ThemeToggle from "./components/ThemeToggle";
import ContentEditor from "./components/ContentEditor";
import Section01Hero from "./sections/Section01Hero";
import Section03WhatIsPMM from "./sections/Section03WhatIsPMM";
import SectionExample from "./sections/SectionExample";
import SectionGoals from "./sections/SectionGoals";
import Section04Deliverables from "./sections/Section04Deliverables";
import SectionVerticalsDivider from "./sections/SectionVerticalsDivider";
import Section06Battles from "./sections/Section06Battles";
import Section07Closing from "./sections/Section07Closing";

export default function App() {
  return (
    <ContentProvider>
      <ThemeToggle />
      <ContentEditor />
      <div className="snap-container">
        <Section01Hero />
        <Section03WhatIsPMM />
        <SectionExample />
        <SectionGoals />
        <Section04Deliverables />
        <SectionVerticalsDivider />
        <Section06Battles />
        <Section07Closing />
      </div>
    </ContentProvider>
  );
}
