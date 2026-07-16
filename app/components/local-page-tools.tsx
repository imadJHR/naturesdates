"use client";

import { FormEvent, useState } from "react";
import { Check, RotateCcw, Send } from "lucide-react";

const builderOptions = {
  "energy-builder": [
    { label: "Fruit direction", options: ["Classic Medjool", "Apple cinnamon", "Cherry cacao"] },
    { label: "Texture", options: ["Oats & almonds", "Pecans & chia", "Cashews & coconut"] },
    { label: "Finish", options: ["Cacao dust", "Coconut coat", "Chopped nuts"] },
  ],
  "smoothie-builder": [
    { label: "Mood", options: ["Morning energy", "Post-movement", "Meal-style blend"] },
    { label: "Base", options: ["Almond milk", "Greek yogurt", "Coconut water"] },
    { label: "Boost", options: ["Berries & chia", "Cacao & cinnamon", "Greens & ginger"] },
  ],
} as const;

export function LocalBuilder({ kind }: { kind: keyof typeof builderOptions }) {
  const groups = builderOptions[kind];
  const [choices, setChoices] = useState<string[]>(() => groups.map((group) => group.options[0]));

  const reset = () => setChoices(groups.map((group) => group.options[0]));

  return (
    <section className="local-tool-section" aria-labelledby="builder-title">
      <div className="info-shell local-builder">
        <div className="local-builder-heading">
          <p className="info-kicker">Interactive local builder</p>
          <h2 id="builder-title">Choose your combination.</h2>
          <p>Tap one option in each group. Use the result as a starting point and adjust amounts for your preferred texture.</p>
        </div>
        <div className="builder-grid">
          <div className="builder-controls">
            {groups.map((group, groupIndex) => (
              <fieldset className="builder-group" key={group.label}>
                <legend><span>{String(groupIndex + 1).padStart(2, "0")}</span>{group.label}</legend>
                <div className="builder-options">
                  {group.options.map((option) => {
                    const selected = choices[groupIndex] === option;
                    return (
                      <button
                        type="button"
                        className={selected ? "builder-option is-selected" : "builder-option"}
                        aria-pressed={selected}
                        key={option}
                        onClick={() => setChoices((current) => current.map((item, index) => index === groupIndex ? option : item))}
                      >
                        {selected && <Check size={16} aria-hidden="true" />}{option}
                      </button>
                    );
                  })}
                </div>
              </fieldset>
            ))}
          </div>
          <aside className="builder-result" aria-live="polite">
            <p>Your sunshine mix</p>
            <h3>{choices.join(" + ")}</h3>
            <ol>
              {kind === "energy-builder" ? (
                <><li>Blend pitted dates with your selected texture.</li><li>Roll the mixture into small bites.</li><li>Add the finish and chill before serving.</li></>
              ) : (
                <><li>Add your base and pitted dates to the blender.</li><li>Add the selected boost and a handful of ice.</li><li>Blend until smooth, adding liquid as needed.</li></>
              )}
            </ol>
            <button className="builder-reset" type="button" onClick={reset}><RotateCcw size={16} /> Reset choices</button>
          </aside>
        </div>
      </div>
    </section>
  );
}

export function LocalContactForm() {
  const [sent, setSent] = useState(false);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSent(true);
    event.currentTarget.reset();
  };

  return (
    <section className="local-tool-section" aria-labelledby="contact-form-title">
      <div className="info-shell contact-form-shell">
        <div>
          <p className="info-kicker">Local contact form</p>
          <h2 id="contact-form-title">Send your message.</h2>
          <p>Email us directly: <a href="mailto:contact@naturesdates.com" className="contact-email-link">contact@naturesdates.com</a></p>
          <p>This demo keeps you on this site. Connect it to your preferred inbox or CRM before publishing if you need live delivery.</p>
        </div>
        <form className="local-contact-form" onSubmit={submit}>
          <label>Name<input name="name" autoComplete="name" required /></label>
          <label>Email<input name="email" type="email" autoComplete="email" required /></label>
          <label>Topic<select name="topic" defaultValue="General question"><option>General question</option><option>Product feedback</option><option>Sales inquiry</option><option>Media or partnership</option></select></label>
          <label className="contact-message">Message<textarea name="message" rows={6} required /></label>
          <button className="contact-submit" type="submit"><Send size={17} /> Send locally</button>
          {sent && <p className="contact-success" role="status"><Check size={17} /> Your message was prepared successfully in this local demo.</p>}
        </form>
      </div>
    </section>
  );
}
