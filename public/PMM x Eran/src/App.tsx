import { ContentProvider } from "./ContentContext";
import ThemeToggle from "./components/ThemeToggle";
import ContentEditor from "./components/ContentEditor";
import Section01Hero from "./sections/Section01Hero";
import Section02Agenda from "./sections/Section02Agenda";
import Section03WhatIsPMM from "./sections/Section03WhatIsPMM";
import Section04Deliverables from "./sections/Section04Deliverables";
import Section05Challenges from "./sections/Section05Challenges";
import Section06Battles from "./sections/Section06Battles";
import Section07Closing from "./sections/Section07Closing";

export default function App() {
  return (
    <ContentProvider>
      <ThemeToggle />
      <ContentEditor />
      <div className="snap-container">
        <Section01Hero />
        <Section02Agenda />
        <Section03WhatIsPMM />
        <Section04Deliverables />
        <Section05Challenges />
        <Section06Battles />
        <Section07Closing />
      </div>
    </ContentProvider>
  );
}
