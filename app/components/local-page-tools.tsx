"use client";

import { FormEvent, useMemo, useState } from "react";
import { Building2, Check, Copy, Mail, PackageSearch, Printer, RotateCcw, Send } from "lucide-react";

const builderOptions = {
  "energy-builder": [
    { label: "Date base", options: ["Pitted Medjools", "Date paste", "Medjools + oats"] },
    { label: "Nuts or seeds", options: ["Almonds", "Pecans", "Sunflower seeds"] },
    { label: "Flavor", options: ["Cacao", "Cinnamon", "Vanilla"] },
    { label: "Texture", options: ["Rolled oats", "Chia seeds", "Crisp rice"] },
    { label: "Coating", options: ["Coconut", "Cacao dust", "Chopped nuts"] },
    { label: "Optional add-in", options: ["Orange zest", "Dried cherries", "No add-in"] },
  ],
  "smoothie-builder": [
    { label: "Liquid base", options: ["Milk or fortified alternative", "Coconut water", "Cold water"] },
    { label: "Fruit", options: ["Banana", "Mixed berries", "Mango"] },
    { label: "Greens", options: ["Baby spinach", "Kale", "No greens"] },
    { label: "Protein choice", options: ["Plain yogurt", "Silken tofu", "No added protein"] },
    { label: "Healthy fat", options: ["Almond butter", "Chia seeds", "Avocado"] },
    { label: "Flavor", options: ["Cinnamon", "Cacao", "Fresh ginger"] },
  ],
} as const;

function recipeText(kind: keyof typeof builderOptions, choices: readonly string[]) {
  if (kind === "energy-builder") {
    return `Custom Medjool energy bites\n\nIngredients\n- 1 packed cup ${choices[0]}\n- 3/4 cup ${choices[1]}\n- 1/2 cup ${choices[3]}\n- 1 tablespoon ${choices[2]}\n- 1/3 cup ${choices[4]} for coating\n- ${choices[5]} to taste\n\nMethod\n1. Pulse the date base, nuts or seeds, texture and flavor until the mixture holds together.\n2. Add the optional add-in and pulse briefly.\n3. Roll into 12 small bites, coat and chill for 20 minutes.\n\nCheck every current ingredient label for allergens.`;
  }
  return `Custom Medjool smoothie\n\nIngredients\n- 1 cup ${choices[0]}\n- 1 to 2 pitted Medjool dates\n- 1 cup ${choices[1]}\n- 1/2 cup ${choices[2]}\n- 1/2 cup ${choices[3]}\n- 1 tablespoon ${choices[4]}\n- ${choices[5]} to taste\n- Ice as desired\n\nMethod\n1. Confirm every date pit is removed.\n2. Blend all ingredients until completely smooth.\n3. Add liquid to thin or ice to thicken, then serve immediately.\n\nCheck every current ingredient label for allergens.`;
}

export function LocalBuilder({ kind }: { kind: keyof typeof builderOptions }) {
  const groups = builderOptions[kind];
  const [choices, setChoices] = useState<string[]>(() => groups.map((group) => group.options[0]));
  const [copied, setCopied] = useState(false);
  const summary = useMemo(() => recipeText(kind, choices), [kind, choices]);
  const reset = () => { setChoices(groups.map((group) => group.options[0])); setCopied(false); };
  const copy = async () => { await navigator.clipboard.writeText(summary); setCopied(true); };
  const allergenWarning = choices.some((choice) => /almond|pecan|yogurt|milk|tofu/i.test(choice))
    ? "Your selection may include milk, soy or tree nuts. Check every current label and avoid cross-contact when needed."
    : "Ingredient and cross-contact risks vary by brand. Check every current label before preparing the recipe.";

  return (
    <section className="local-tool-section" aria-labelledby="builder-title">
      <div className="info-shell local-builder">
        <div className="local-builder-heading"><p className="info-kicker">Interactive recipe builder</p><h2 id="builder-title">Choose your combination.</h2><p>Select one option in each group. The builder supplies a practical starting quantity without calculating nutrition.</p></div>
        <div className="builder-grid">
          <div className="builder-controls">
            {groups.map((group, groupIndex) => (
              <fieldset className="builder-group" key={group.label}>
                <legend><span>{String(groupIndex + 1).padStart(2, "0")}</span>{group.label}</legend>
                <div className="builder-options">{group.options.map((option) => {
                  const selected = choices[groupIndex] === option;
                  return <button type="button" className={selected ? "builder-option is-selected" : "builder-option"} aria-pressed={selected} key={option} onClick={() => setChoices((current) => current.map((item, index) => index === groupIndex ? option : item))}>{selected && <Check size={16} aria-hidden="true" />}{option}</button>;
                })}</div>
              </fieldset>
            ))}
          </div>
          <aside className="builder-result" aria-live="polite">
            <p>Your custom recipe</p><h3>{kind === "energy-builder" ? "Medjool energy bites" : "Medjool smoothie"}</h3>
            <pre>{summary}</pre>
            <p className="builder-allergen"><strong>Allergen note:</strong> {allergenWarning}</p>
            <div className="builder-result-actions"><button className="builder-reset" type="button" onClick={reset}><RotateCcw size={16} /> Reset</button><button className="builder-reset" type="button" onClick={copy}><Copy size={16} /> {copied ? "Copied" : "Copy"}</button><button className="builder-reset" type="button" onClick={() => window.print()}><Printer size={16} /> Print</button></div>
          </aside>
        </div>
      </div>
    </section>
  );
}

type ContactStatus = "idle" | "success" | "error";

export function LocalContactForm() {
  const [status, setStatus] = useState<ContactStatus>("idle");
  const [mailto, setMailto] = useState("mailto:contact@naturesdates.com");

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (data.get("website")) { setStatus("error"); return; }
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const company = String(data.get("company") ?? "").trim();
    const location = String(data.get("location") ?? "").trim();
    const topic = String(data.get("topic") ?? "General inquiry");
    const message = String(data.get("message") ?? "").trim();
    if (name.length < 2 || message.length < 10 || !email.includes("@")) { setStatus("error"); return; }
    const body = `Name: ${name}\nEmail: ${email}\nCompany: ${company || "Not provided"}\nLocation: ${location || "Not provided"}\nInquiry: ${topic}\n\n${message}`;
    setMailto(`mailto:contact@naturesdates.com?subject=${encodeURIComponent(`${topic} from ${name}`)}&body=${encodeURIComponent(body)}`);
    setStatus("success");
  };

  return (
    <section className="local-tool-section" id="contact-form" aria-labelledby="contact-form-title"><div className="info-shell contact-form-shell">
      <div className="contact-form-intro">
        <p className="info-kicker">Contact Nature&apos;s Dates</p><h2 id="contact-form-title">Let&apos;s get your question to the right place.</h2>
        <p>Choose a topic and share the useful details. This form prepares a complete email draft for you to review and send.</p>
        <a href="mailto:contact@naturesdates.com" className="contact-email-link"><Mail size={18} /> contact@naturesdates.com</a>
        <div className="contact-route-list">
          <article><PackageSearch size={21} /><div><strong>Product support</strong><span>Include the product, package code, purchase location and what happened.</span></div></article>
          <article><Building2 size={21} /><div><strong>Wholesale &amp; retail</strong><span>Include your company, region, estimated quantity and preferred format.</span></div></article>
        </div>
        <p className="contact-privacy-note"><strong>A quick privacy note:</strong> Do not include payment details, passwords, medical records or other sensitive personal information.</p>
      </div>
      <form className="local-contact-form" onSubmit={submit} noValidate>
        <div className="contact-form-heading"><span>Tell us a little more</span><strong>Fields marked * are required.</strong></div>
        <label>Name *<input name="name" autoComplete="name" minLength={2} placeholder="Your full name" required /></label>
        <label>Email *<input name="email" type="email" autoComplete="email" placeholder="you@example.com" required /></label>
        <label>Company or organization<input name="company" autoComplete="organization" placeholder="Optional" /></label>
        <label>City and country<input name="location" autoComplete="address-level2 country-name" placeholder="Helpful for availability questions" /></label>
        <label className="contact-topic">Inquiry type *<select name="topic" defaultValue="General inquiry"><option>General inquiry</option><option>Customer support inquiry</option><option>Wholesale inquiry</option><option>Retail partnership inquiry</option><option>Press inquiry</option></select></label>
        <label className="contact-honeypot" aria-hidden="true">Website<input name="website" tabIndex={-1} autoComplete="off" /></label>
        <label className="contact-message">How can we help? *<textarea name="message" rows={7} minLength={10} placeholder="For product support, include the exact product, package details, where you bought it and a clear description." required /></label>
        <button className="contact-submit" type="submit"><Send size={17} /> Prepare your email</button>
        <small className="contact-form-footnote">Nothing is sent automatically. You will review the draft in your email app before sending.</small>
        {status === "success" && <p className="contact-success" role="status"><Check size={17} /> Your email draft is ready. <a href={mailto}>Open your email app to send it.</a></p>}
        {status === "error" && <p className="contact-error" role="alert">Please enter a valid name, email and message, then try again.</p>}
      </form>
    </div></section>
  );
}

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  return <form className="newsletter-form" onSubmit={(event) => { event.preventDefault(); window.location.href = `mailto:contact@naturesdates.com?subject=${encodeURIComponent("Newsletter interest")}&body=${encodeURIComponent(`Please add ${email} to the newsletter when subscriptions are available.`)}`; }}><label htmlFor="newsletter-email">Email address</label><div><input id="newsletter-email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} autoComplete="email" placeholder="you@example.com" required /><button type="submit">Join by email <Send size={15} /></button></div><small>Opens your email app. Live newsletter delivery requires a verified email provider.</small></form>;
}
