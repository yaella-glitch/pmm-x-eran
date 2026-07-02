import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useContentController } from "../ContentContext";

export default function ContentEditor() {
  const { content, setContent, resetContent, hasOverride } = useContentController();
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState<any>(content);
  const [savedNote, setSavedNote] = useState<string | null>(null);

  useEffect(() => {
    if (open) {
      setDraft(JSON.parse(JSON.stringify(content)));
      setSavedNote(null);
    }
  }, [open, content]);

  const applyChange = (newDraft: any) => {
    setDraft(newDraft);
    setContent(newDraft);
  };

  const update = (path: (string | number)[], value: any) => {
    const next = JSON.parse(JSON.stringify(draft));
    let cur = next;
    for (let i = 0; i < path.length - 1; i++) cur = cur[path[i]];
    cur[path[path.length - 1]] = value;
    applyChange(next);
  };

  const arrayAdd = (path: (string | number)[], item: any) => {
    const next = JSON.parse(JSON.stringify(draft));
    let cur = next;
    for (let i = 0; i < path.length; i++) cur = cur[path[i]];
    cur.push(item);
    applyChange(next);
  };

  const arrayRemove = (path: (string | number)[], index: number) => {
    const next = JSON.parse(JSON.stringify(draft));
    let cur = next;
    for (let i = 0; i < path.length; i++) cur = cur[path[i]];
    cur.splice(index, 1);
    applyChange(next);
  };

  const download = () => {
    const blob = new Blob([JSON.stringify(draft, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "content.json";
    a.click();
    URL.revokeObjectURL(url);
    setSavedNote("Downloaded — replace src/content.json to make it permanent.");
    setTimeout(() => setSavedNote(null), 3500);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        title="Edit text and images"
        aria-label="Edit content"
        style={{
          position: "fixed",
          bottom: 16,
          right: 56,
          zIndex: 100,
          width: 32,
          height: 32,
          borderRadius: 50,
          background: hasOverride
            ? "linear-gradient(135deg, var(--c-violet), var(--c-indigo))"
            : "var(--color-surface)",
          border: "0.5px solid var(--color-border)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          color: hasOverride ? "white" : "var(--color-text-muted)",
          fontFamily: "inherit",
          opacity: hasOverride ? 1 : 0.5,
          transition: "opacity 0.3s",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
        onMouseLeave={(e) => (e.currentTarget.style.opacity = hasOverride ? "1" : "0.5")}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
          <path
            d="M14.06 9 15 9.94 5.92 19H5v-.92zm3.6-6c-.25 0-.51.1-.7.29l-1.83 1.83 3.75 3.75 1.83-1.83a1 1 0 0 0 0-1.41l-2.34-2.34a.96.96 0 0 0-.71-.29zm-3.6 3.19L3 17.25V21h3.75L17.81 9.94z"
            fill="currentColor"
          />
        </svg>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,0.6)",
              zIndex: 200,
              display: "flex",
              alignItems: "stretch",
              justifyContent: "flex-end",
              backdropFilter: "blur(4px)",
            }}
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ x: 50 }}
              animate={{ x: 0 }}
              exit={{ x: 50 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                width: "100%",
                maxWidth: 640,
                height: "100%",
                background: "var(--color-surface)",
                borderLeft: "0.5px solid var(--color-border-strong)",
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  padding: "1.5rem 2rem",
                  borderBottom: "0.5px solid var(--color-border)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "1rem",
                  flexShrink: 0,
                }}
              >
                <div>
                  <h2 style={{ margin: 0, fontSize: 22, fontWeight: 500, color: "var(--color-text)" }}>
                    Edit content
                  </h2>
                  <p style={{ margin: "0.25rem 0 0", fontSize: 13, color: "var(--color-text-muted)" }}>
                    Edit any field. Changes appear live on the page.
                  </p>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  aria-label="close"
                  style={{
                    background: "transparent",
                    border: "0.5px solid var(--color-border-strong)",
                    borderRadius: 999,
                    width: 32,
                    height: 32,
                    cursor: "pointer",
                    color: "var(--color-text)",
                    fontFamily: "inherit",
                    fontSize: 16,
                    flexShrink: 0,
                  }}
                >
                  ×
                </button>
              </div>

              {savedNote && (
                <div
                  style={{
                    padding: "0.75rem 2rem",
                    background: "rgba(52, 211, 153, 0.12)",
                    borderBottom: "0.5px solid rgba(52, 211, 153, 0.5)",
                    color: "#34d399",
                    fontSize: 13,
                  }}
                >
                  {savedNote}
                </div>
              )}

              <div style={{ flex: 1, overflowY: "auto", padding: "1.5rem 2rem 4rem" }}>
                <EditorBody draft={draft} update={update} arrayAdd={arrayAdd} arrayRemove={arrayRemove} />
              </div>

              <div
                style={{
                  padding: "1rem 2rem 1.25rem",
                  borderTop: "0.5px solid var(--color-border)",
                  display: "flex",
                  gap: "0.75rem",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexShrink: 0,
                  flexWrap: "wrap",
                }}
              >
                <button onClick={download} style={primaryBtn}>
                  Download to save permanently
                </button>
                <button
                  onClick={() => resetContent()}
                  disabled={!hasOverride}
                  style={{
                    ...secondaryBtn,
                    opacity: hasOverride ? 1 : 0.4,
                    cursor: hasOverride ? "pointer" : "not-allowed",
                  }}
                >
                  Reset
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function EditorBody({
  draft,
  update,
  arrayAdd,
  arrayRemove,
}: {
  draft: any;
  update: (path: any[], value: any) => void;
  arrayAdd: (path: any[], item: any) => void;
  arrayRemove: (path: any[], index: number) => void;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      {/* HERO */}
      <Section title="1. Today's goal (hero)">
        <TextField label="Section label (top)" value={draft.section1_hero.label} onChange={(v) => update(["section1_hero", "label"], v)} />
        <TextField label="Title line 1" value={draft.section1_hero.title_line_1} onChange={(v) => update(["section1_hero", "title_line_1"], v)} />
        <TextField label="Title line 2" value={draft.section1_hero.title_line_2} onChange={(v) => update(["section1_hero", "title_line_2"], v)} />
        <TextField label="Date" value={draft.section1_hero.date} onChange={(v) => update(["section1_hero", "date"], v)} />

        <Subgroup title="Agenda items (shown in the right-side card)">
          {draft.section1_hero.agenda.map((a: any, i: number) => (
            <NestedCard key={i} title={`${i + 1}. ${a.text}`} onRemove={() => arrayRemove(["section1_hero", "agenda"], i)}>
              <TextField label="Text" value={a.text} onChange={(v) => update(["section1_hero", "agenda", i, "text"], v)} />
              <TextField label="Duration" value={a.duration} onChange={(v) => update(["section1_hero", "agenda", i, "duration"], v)} />
            </NestedCard>
          ))}
          <AddBtn onClick={() => arrayAdd(["section1_hero", "agenda"], { text: "New topic", duration: "10 min" })}>+ Add agenda item</AddBtn>
        </Subgroup>
      </Section>

      {/* PMM ROLE (What is our goal?) */}
      <Section title="2. What is our goal? (PMM role)">
        <TextField label="Section label" value={draft.section3_what_is_pmm.label} onChange={(v) => update(["section3_what_is_pmm", "label"], v)} />
        <TextField label="Title" value={draft.section3_what_is_pmm.title} onChange={(v) => update(["section3_what_is_pmm", "title"], v)} />

        <Subgroup title="Customer personas (entering the funnel)">
          {draft.section3_what_is_pmm.personas?.map((p: any, i: number) => (
            <NestedCard key={i} title={p.name} onRemove={() => arrayRemove(["section3_what_is_pmm", "personas"], i)}>
              <TextField label="Name" value={p.name} onChange={(v) => update(["section3_what_is_pmm", "personas", i, "name"], v)} />
              <TextField label="Avatar image path" value={p.avatar || ""} onChange={(v) => update(["section3_what_is_pmm", "personas", i, "avatar"], v)} hint="Drop image into public/personas/ then use /personas/yourfile.png" />
            </NestedCard>
          ))}
          <AddBtn onClick={() => arrayAdd(["section3_what_is_pmm", "personas"], { name: "New", avatar: "" })}>+ Add persona</AddBtn>
        </Subgroup>

        <Subgroup title="Product features (with monday logos)">
          {draft.section3_what_is_pmm.features.map((f: any, i: number) => (
            <NestedCard key={i} title={f.name} onRemove={() => arrayRemove(["section3_what_is_pmm", "features"], i)}>
              <TextField label="Name" value={f.name} onChange={(v) => update(["section3_what_is_pmm", "features", i, "name"], v)} />
              <TextField label="Logo image path" value={f.logo} onChange={(v) => update(["section3_what_is_pmm", "features", i, "logo"], v)} hint="Drop image into public/product-icons/ then use /product-icons/yourfile.png" />
            </NestedCard>
          ))}
          <AddBtn onClick={() => arrayAdd(["section3_what_is_pmm", "features"], { name: "New", logo: "" })}>+ Add feature</AddBtn>
        </Subgroup>

        <Subgroup title="Funnel outputs — Top of the funnel">
          <OutputsEditor
            path={["section3_what_is_pmm", "outputs", "top"]}
            items={draft.section3_what_is_pmm.outputs.top}
            update={update}
            arrayAdd={arrayAdd}
            arrayRemove={arrayRemove}
          />
        </Subgroup>
        <Subgroup title="Funnel outputs — Middle of the funnel">
          <OutputsEditor
            path={["section3_what_is_pmm", "outputs", "middle"]}
            items={draft.section3_what_is_pmm.outputs.middle}
            update={update}
            arrayAdd={arrayAdd}
            arrayRemove={arrayRemove}
          />
        </Subgroup>
        <Subgroup title="Funnel outputs — Bottom of the funnel">
          <OutputsEditor
            path={["section3_what_is_pmm", "outputs", "bottom"]}
            items={draft.section3_what_is_pmm.outputs.bottom}
            update={update}
            arrayAdd={arrayAdd}
            arrayRemove={arrayRemove}
          />
        </Subgroup>
      </Section>

      {/* EXAMPLE */}
      <Section title="3. Let's take an example">
        <TextField label="Section label" value={draft.section_example?.label || ""} onChange={(v) => update(["section_example", "label"], v)} />
        <TextField label="Left column label (brief)" value={draft.section_example?.brief_label || ""} onChange={(v) => update(["section_example", "brief_label"], v)} />
        <TextField label="Right column label (gallery)" value={draft.section_example?.gallery_label || ""} onChange={(v) => update(["section_example", "gallery_label"], v)} />
        <TextField
          label="Brief image path"
          value={draft.section_example?.brief_image || ""}
          onChange={(v) => update(["section_example", "brief_image"], v)}
          hint="Drop image into public/example/ then use /example/yourfile.png"
        />
        <Subgroup title="Gallery images (right side)">
          {(draft.section_example?.gallery || []).map((img: string, i: number) => (
            <Row key={i}>
              <TextField
                label={`Image ${i + 1} path`}
                value={img}
                onChange={(v) => update(["section_example", "gallery", i], v)}
                hint="Path like /example/asset-1.png"
              />
              <RemoveBtn onClick={() => arrayRemove(["section_example", "gallery"], i)} />
            </Row>
          ))}
          <AddBtn onClick={() => arrayAdd(["section_example", "gallery"], "")}>+ Add image</AddBtn>
        </Subgroup>
      </Section>

      {/* DELIVERABLES */}
      <Section title="4. A glimpse to our deliverables">
        <TextField label="Section label" value={draft.section4_deliverables.label} onChange={(v) => update(["section4_deliverables", "label"], v)} />
        <TextField label="Title" value={draft.section4_deliverables.title} onChange={(v) => update(["section4_deliverables", "title"], v)} />

        {draft.section4_deliverables.categories.map((cat: any, ci: number) => (
          <NestedCard key={ci} title={`Category: ${cat.name}`} onRemove={() => arrayRemove(["section4_deliverables", "categories"], ci)}>
            <TextField label="Category name" value={cat.name} onChange={(v) => update(["section4_deliverables", "categories", ci, "name"], v)} />
            <Subgroup title="Items">
              {cat.items.map((it: any, ii: number) => (
                <NestedCard key={ii} title={it.name || "(unnamed)"} onRemove={() => arrayRemove(["section4_deliverables", "categories", ci, "items"], ii)}>
                  <TextField label="Name" value={it.name} onChange={(v) => update(["section4_deliverables", "categories", ci, "items", ii, "name"], v)} />
                  <TextAreaField label="Description" value={it.description || ""} onChange={(v) => update(["section4_deliverables", "categories", ci, "items", ii, "description"], v)} />
                  <TextAreaField label="Impact (metrics)" value={it.impact || ""} onChange={(v) => update(["section4_deliverables", "categories", ci, "items", ii, "impact"], v)} />
                  <Subgroup title="Images (gallery)">
                    {(it.images || []).map((img: string, imgI: number) => (
                      <Row key={imgI}>
                        <TextField
                          label={`Image ${imgI + 1} path`}
                          value={img}
                          onChange={(v) => update(["section4_deliverables", "categories", ci, "items", ii, "images", imgI], v)}
                          hint="Drop image into public/deliverables/ then use /deliverables/filename.png"
                        />
                        <RemoveBtn onClick={() => arrayRemove(["section4_deliverables", "categories", ci, "items", ii, "images"], imgI)} />
                      </Row>
                    ))}
                    <AddBtn onClick={() => arrayAdd(["section4_deliverables", "categories", ci, "items", ii, "images"], "")}>+ Add image</AddBtn>
                  </Subgroup>
                </NestedCard>
              ))}
              <AddBtn onClick={() => arrayAdd(["section4_deliverables", "categories", ci, "items"], { name: "New item", description: "", images: [], impact: "" })}>+ Add item</AddBtn>
            </Subgroup>
          </NestedCard>
        ))}
        <AddBtn onClick={() => arrayAdd(["section4_deliverables", "categories"], { name: "New category", items: [] })}>+ Add category</AddBtn>
      </Section>

      {/* VERTICALS DIVIDER */}
      <Section title="5. Verticals zoom-in (divider slide)">
        <TextField label="Title" value={draft.section5_verticals_divider?.title || ""} onChange={(v) => update(["section5_verticals_divider", "title"], v)} />
      </Section>

      {/* VERTICALS CONTENT */}
      <Section title="6. Verticals content">
        <TextField label="Section label" value={draft.section6_battles.label} onChange={(v) => update(["section6_battles", "label"], v)} />
        <TextField label="Vertical name" value={draft.section6_battles.battle.name} onChange={(v) => update(["section6_battles", "battle", "name"], v)} />
        <TextField label="Summary" value={draft.section6_battles.battle.summary} onChange={(v) => update(["section6_battles", "battle", "summary"], v)} />

        <Subgroup title="Tabs (Baseline / Offering / Journey)">
          {draft.section6_battles.battle.subviews.map((sv: any, j: number) => (
            <NestedCard key={j} title={`Tab: ${sv.name}`} onRemove={() => arrayRemove(["section6_battles", "battle", "subviews"], j)}>
              <TextField label="Tab name" value={sv.name} onChange={(v) => update(["section6_battles", "battle", "subviews", j, "name"], v)} />
              {sv.kind === "goal" && (
                <>
                  <TextAreaField
                    label="Goal statement"
                    value={sv.statement || ""}
                    onChange={(v) => update(["section6_battles", "battle", "subviews", j, "statement"], v)}
                  />
                  <Subgroup title="KPI boxes">
                    {(sv.kpis || []).map((k: any, ki: number) => (
                      <NestedCard
                        key={ki}
                        title={k.label || `KPI ${ki + 1}`}
                        onRemove={() => arrayRemove(["section6_battles", "battle", "subviews", j, "kpis"], ki)}
                      >
                        <TextField
                          label="Label"
                          value={k.label || ""}
                          onChange={(v) => update(["section6_battles", "battle", "subviews", j, "kpis", ki, "label"], v)}
                        />
                        <TextField
                          label="Value (e.g. $2.5M, +30%)"
                          value={k.value || ""}
                          onChange={(v) => update(["section6_battles", "battle", "subviews", j, "kpis", ki, "value"], v)}
                        />
                      </NestedCard>
                    ))}
                    <AddBtn onClick={() => arrayAdd(["section6_battles", "battle", "subviews", j, "kpis"], { label: "New KPI", value: "" })}>
                      + Add KPI
                    </AddBtn>
                  </Subgroup>
                </>
              )}
              {sv.kind === "baseline" && (
                <BaselineEditor
                  subview={sv}
                  path={["section6_battles", "battle", "subviews", j]}
                  update={update}
                  arrayAdd={arrayAdd}
                  arrayRemove={arrayRemove}
                />
              )}
              {sv.kind === "offering" && (
                <OfferingEditor
                  subview={sv}
                  path={["section6_battles", "battle", "subviews", j]}
                  update={update}
                  arrayAdd={arrayAdd}
                  arrayRemove={arrayRemove}
                />
              )}
              {sv.kind === "journey" && (
                <JourneyEditor
                  subview={sv}
                  path={["section6_battles", "battle", "subviews", j]}
                  update={update}
                  arrayAdd={arrayAdd}
                  arrayRemove={arrayRemove}
                />
              )}
            </NestedCard>
          ))}
        </Subgroup>
      </Section>

      {/* CLOSING */}
      <Section title="7. Closing">
        <TextField label="Title" value={draft.section7_closing.title} onChange={(v) => update(["section7_closing", "title"], v)} />
        <TextField label="Subtitle" value={draft.section7_closing.subtitle} onChange={(v) => update(["section7_closing", "subtitle"], v)} />
      </Section>
    </div>
  );
}

function OutputsEditor({ path, items, update, arrayAdd, arrayRemove }: any) {
  return (
    <>
      {items.map((o: any, i: number) => (
        <Row key={i}>
          <TextField
            label={`Item ${i + 1}`}
            value={o.name}
            onChange={(v) => update([...path, i, "name"], v)}
          />
          <CheckboxField
            label="PMM owns"
            checked={o.owned}
            onChange={(v) => update([...path, i, "owned"], v)}
          />
          <RemoveBtn onClick={() => arrayRemove(path, i)} />
        </Row>
      ))}
      <AddBtn onClick={() => arrayAdd(path, { name: "New", owned: false })}>+ Add item</AddBtn>
    </>
  );
}

function BaselineEditor({ subview, path, update, arrayAdd, arrayRemove }: any) {
  return (
    <>
      <TextAreaField label="Goal" value={subview.goal} onChange={(v) => update([...path, "goal"], v)} />
      <FieldLabel>Table headers</FieldLabel>
      <Row>
        {subview.headers.map((h: string, i: number) => (
          <TextField key={i} label="" value={h} onChange={(v) => update([...path, "headers", i], v)} />
        ))}
      </Row>
      <FieldLabel>Table rows</FieldLabel>
      {subview.rows.map((row: string[], rowIdx: number) => (
        <Row key={rowIdx}>
          {row.map((cell: string, cellIdx: number) => (
            <TextField key={cellIdx} label="" value={cell} onChange={(v) => update([...path, "rows", rowIdx, cellIdx], v)} />
          ))}
          <RemoveBtn onClick={() => arrayRemove([...path, "rows"], rowIdx)} />
        </Row>
      ))}
      <AddBtn onClick={() => arrayAdd([...path, "rows"], subview.headers.map(() => ""))}>+ Add row</AddBtn>
    </>
  );
}

function OfferingEditor({ subview, path, update, arrayAdd, arrayRemove }: any) {
  const p = subview.persona;
  return (
    <>
      <Subgroup title="Persona (left side card)">
        <TextField label="Name" value={p.name} onChange={(v) => update([...path, "persona", "name"], v)} />
        <TextAreaField label="Subtitle (short description below the name)" value={p.subtitle} onChange={(v) => update([...path, "persona", "subtitle"], v)} />

        <FieldLabel>Needs</FieldLabel>
        {(p.needs || []).map((n: string, i: number) => (
          <Row key={i}>
            <TextField label="" value={n} onChange={(v) => update([...path, "persona", "needs", i], v)} />
            <RemoveBtn onClick={() => arrayRemove([...path, "persona", "needs"], i)} />
          </Row>
        ))}
        <AddBtn onClick={() => arrayAdd([...path, "persona", "needs"], "New need")}>+ Add need</AddBtn>

        <FieldLabel>Our offering</FieldLabel>
        {(p.offering_bullets || []).map((n: string, i: number) => (
          <Row key={i}>
            <TextField label="" value={n} onChange={(v) => update([...path, "persona", "offering_bullets", i], v)} />
            <RemoveBtn onClick={() => arrayRemove([...path, "persona", "offering_bullets"], i)} />
          </Row>
        ))}
        <AddBtn onClick={() => arrayAdd([...path, "persona", "offering_bullets"], "New offering bullet")}>+ Add offering bullet</AddBtn>

        <FieldLabel>Business outcomes</FieldLabel>
        {(p.outcomes || []).map((n: string, i: number) => (
          <Row key={i}>
            <TextField label="" value={n} onChange={(v) => update([...path, "persona", "outcomes", i], v)} />
            <RemoveBtn onClick={() => arrayRemove([...path, "persona", "outcomes"], i)} />
          </Row>
        ))}
        <AddBtn onClick={() => arrayAdd([...path, "persona", "outcomes"], "New outcome")}>+ Add outcome</AddBtn>
      </Subgroup>

      <Subgroup title="Right-side image">
        <TextField
          label="Image path"
          value={subview.stack_image || ""}
          onChange={(v) => update([...path, "stack_image"], v)}
          hint="Drop the file into public/deliverables/ (or any subfolder). Path example: /deliverables/marketing-stack.png"
        />
      </Subgroup>
    </>
  );
}

function JourneyEditor({ subview, path, update, arrayAdd, arrayRemove }: any) {
  return (
    <>
      {subview.stages.map((stage: any, i: number) => (
        <NestedCard key={i} title={`Stage ${i + 1}: ${stage.name}`} onRemove={() => arrayRemove([...path, "stages"], i)}>
          <TextField label="Name" value={stage.name} onChange={(v) => update([...path, "stages", i, "name"], v)} />
          <TextField label="Detail" value={stage.detail} onChange={(v) => update([...path, "stages", i, "detail"], v)} />
          <TextField label="Asset image path" value={stage.asset || ""} onChange={(v) => update([...path, "stages", i, "asset"], v)} hint="Drop image into public/deliverables/ then use /deliverables/yourfile.png" />
        </NestedCard>
      ))}
      <AddBtn onClick={() => arrayAdd([...path, "stages"], { name: "New stage", detail: "", asset: "" })}>+ Add stage</AddBtn>
    </>
  );
}

// ----- UI primitives -----

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <details open style={{ border: "0.5px solid var(--color-border)", borderRadius: 12, background: "var(--color-surface-2)" }}>
      <summary
        style={{
          cursor: "pointer",
          padding: "0.9rem 1.1rem",
          fontWeight: 500,
          fontSize: 15,
          color: "var(--color-text)",
          listStyle: "none",
        }}
      >
        {title}
      </summary>
      <div style={{ padding: "0 1.1rem 1.1rem", display: "flex", flexDirection: "column", gap: "0.9rem" }}>
        {children}
      </div>
    </details>
  );
}

function Subgroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div
      style={{
        padding: "0.85rem 1rem 1rem",
        border: "0.5px dashed var(--color-border-strong)",
        borderRadius: 10,
        display: "flex",
        flexDirection: "column",
        gap: "0.7rem",
        marginTop: "0.4rem",
      }}
    >
      <p
        className="font-serif-italic"
        style={{ margin: 0, fontSize: 13, color: "var(--c-indigo)" }}
      >
        → {title}
      </p>
      {children}
    </div>
  );
}

function NestedCard({ title, onRemove, children }: { title: string; onRemove?: () => void; children: React.ReactNode }) {
  return (
    <details
      style={{
        border: "0.5px solid var(--color-border)",
        borderRadius: 10,
        background: "var(--color-surface)",
      }}
    >
      <summary
        style={{
          cursor: "pointer",
          padding: "0.7rem 0.95rem",
          fontSize: 13,
          color: "var(--color-text)",
          listStyle: "none",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "0.5rem",
        }}
      >
        <span>{title}</span>
        {onRemove && (
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onRemove();
            }}
            aria-label="remove"
            style={{
              background: "transparent",
              border: "none",
              cursor: "pointer",
              color: "var(--color-text-muted)",
              fontSize: 14,
              padding: "0.2rem 0.5rem",
            }}
          >
            ×
          </button>
        )}
      </summary>
      <div style={{ padding: "0.5rem 1rem 1rem", display: "flex", flexDirection: "column", gap: "0.7rem" }}>
        {children}
      </div>
    </details>
  );
}

function Row({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", gap: "0.5rem", alignItems: "flex-end", flexWrap: "wrap" }}>
      {children}
    </div>
  );
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <p style={{ margin: "0.4rem 0 -0.2rem", fontSize: 12, color: "var(--color-text-muted)", fontWeight: 500 }}>
      {children}
    </p>
  );
}

function TextField({ label, value, onChange, hint }: { label: string; value: string; onChange: (v: string) => void; hint?: string }) {
  return (
    <label style={{ display: "flex", flexDirection: "column", gap: "0.3rem", flex: 1, minWidth: 100 }}>
      {label && <span style={{ fontSize: 12, color: "var(--color-text-muted)" }}>{label}</span>}
      <input type="text" value={value || ""} onChange={(e) => onChange(e.target.value)} style={inputStyle} />
      {hint && <span style={{ fontSize: 11, color: "var(--color-text-soft)", fontStyle: "italic" }}>{hint}</span>}
    </label>
  );
}

function TextAreaField({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <label style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
      <span style={{ fontSize: 12, color: "var(--color-text-muted)" }}>{label}</span>
      <textarea value={value || ""} onChange={(e) => onChange(e.target.value)} rows={2} style={{ ...inputStyle, resize: "vertical", minHeight: 48, lineHeight: 1.4 }} />
    </label>
  );
}

function CheckboxField({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <label style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontSize: 12, color: "var(--color-text-muted)", cursor: "pointer", flexShrink: 0, marginBottom: 8 }}>
      <input type="checkbox" checked={!!checked} onChange={(e) => onChange(e.target.checked)} style={{ cursor: "pointer" }} />
      {label}
    </label>
  );
}

function RemoveBtn({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="remove"
      style={{
        background: "transparent",
        border: "0.5px solid var(--color-border-strong)",
        borderRadius: 8,
        width: 30,
        height: 30,
        cursor: "pointer",
        color: "var(--color-text-muted)",
        fontSize: 14,
        fontFamily: "inherit",
        marginBottom: 1,
        flexShrink: 0,
      }}
    >
      ×
    </button>
  );
}

function AddBtn({ onClick, children }: { onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        background: "transparent",
        border: "0.5px dashed var(--c-indigo)",
        borderRadius: 8,
        padding: "0.5rem 0.9rem",
        cursor: "pointer",
        color: "var(--c-indigo)",
        fontSize: 12,
        fontFamily: "inherit",
        alignSelf: "flex-start",
        fontWeight: 500,
      }}
    >
      {children}
    </button>
  );
}

const inputStyle: React.CSSProperties = {
  background: "var(--color-surface)",
  border: "0.5px solid var(--color-border)",
  borderRadius: 8,
  padding: "0.5rem 0.75rem",
  fontSize: 13,
  color: "var(--color-text)",
  fontFamily: "inherit",
  width: "100%",
  boxSizing: "border-box",
  outline: "none",
};

const primaryBtn: React.CSSProperties = {
  background: "linear-gradient(135deg, var(--c-violet), var(--c-indigo))",
  color: "white",
  border: "none",
  borderRadius: 999,
  padding: "0.6rem 1.4rem",
  fontSize: 14,
  fontWeight: 500,
  cursor: "pointer",
  fontFamily: "inherit",
};

const secondaryBtn: React.CSSProperties = {
  background: "transparent",
  color: "var(--color-text)",
  border: "0.5px solid var(--color-border-strong)",
  borderRadius: 999,
  padding: "0.55rem 1.2rem",
  fontSize: 13,
  cursor: "pointer",
  fontFamily: "inherit",
};
