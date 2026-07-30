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
    <section className="px-4 py-[86px] bg-[#1B4D3E] text-white" aria-labelledby="builder-title">
      <div className="w-[min(1180px,calc(100%-28px))] mx-auto">
        <div className="max-w-[760px] mb-[38px]">
          <p className="text-[#C9A961] text-xs font-black tracking-[0.16em] uppercase mb-4">Interactive recipe builder</p>
          <h2 id="builder-title" className="m-0 text-white text-[clamp(38px,10vw,64px)] leading-[0.92] tracking-[-0.05em]">Choose your combination.</h2>
          <p className="text-white/72 text-base leading-[1.7] mt-[18px]">Select one option in each group. The builder supplies a practical starting quantity without calculating nutrition.</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_0.6fr] gap-[22px] lg:gap-7">
          <div className="grid gap-3.5">
            {groups.map((group, groupIndex) => (
              <fieldset className="m-0 p-5 border border-white/16 rounded-3xl bg-white/6" key={group.label}>
                <legend className="px-[7px] text-white font-black"><span className="mr-[9px] text-[#C9A961] text-[11px] tracking-[0.12em]">{String(groupIndex + 1).padStart(2, "0")}</span>{group.label}</legend>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-2.5">
                  {group.options.map((option) => {
                    const selected = choices[groupIndex] === option;
                    return (
                      <button
                        type="button"
                        className={`min-h-[48px] flex items-center justify-center gap-2 border rounded-[16px] px-3.5 py-2.5 font-black cursor-pointer transition-all duration-200 ${selected ? "border-[#C9A961] bg-[#C9A961] text-[#1B4D3E]" : "border-white/16 bg-white/7 text-white hover:bg-white/12"}`}
                        aria-pressed={selected}
                        key={option}
                        onClick={() => setChoices((current) => current.map((item, index) => index === groupIndex ? option : item))}
                      >
                        {selected && <Check size={16} aria-hidden="true" />}
                        {option}
                      </button>
                    );
                  })}
                </div>
              </fieldset>
            ))}
          </div>
          <aside className="p-[26px] rounded-[28px] bg-[#fff8f1] text-[#1B4D3E] shadow-[0_26px_60px_rgba(0,0,0,0.2)] self-start" aria-live="polite">
            <p className="m-0 mb-2.5 text-[#8B1832] text-[11px] font-black tracking-[0.14em] uppercase">Your custom recipe</p>
            <h3 className="m-0 text-[clamp(26px,7vw,42px)] leading-[1] tracking-[-0.04em]">{kind === "energy-builder" ? "Medjool energy bites" : "Medjool smoothie"}</h3>
            <pre className="mt-6 mb-6 text-sm leading-[1.55] whitespace-pre-wrap font-sans">{summary}</pre>
            <p className="text-sm leading-[1.55] text-[rgba(27,77,62,0.72)]"><strong className="text-[#8B1832]">Allergen note:</strong> {allergenWarning}</p>
            <div className="flex flex-wrap gap-2 mt-6">
              <button className="min-h-[44px] inline-flex items-center justify-center gap-2 border-0 rounded-full px-4 py-2.5 bg-[#1B4D3E] text-white font-black cursor-pointer transition-all duration-200 hover:brightness-110" type="button" onClick={reset}><RotateCcw size={16} /> Reset</button>
              <button className="min-h-[44px] inline-flex items-center justify-center gap-2 border-0 rounded-full px-4 py-2.5 bg-[#1B4D3E] text-white font-black cursor-pointer transition-all duration-200 hover:brightness-110" type="button" onClick={copy}><Copy size={16} /> {copied ? "Copied" : "Copy"}</button>
              <button className="min-h-[44px] inline-flex items-center justify-center gap-2 border-0 rounded-full px-4 py-2.5 bg-[#1B4D3E] text-white font-black cursor-pointer transition-all duration-200 hover:brightness-110" type="button" onClick={() => window.print()}><Printer size={16} /> Print</button>
            </div>
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
    <section className="px-4 py-[clamp(82px,9vw,126px)] bg-[#633521] text-white" id="contact-form" aria-labelledby="contact-form-title">
      <div className="w-[min(1180px,calc(100%-28px))] mx-auto grid grid-cols-1 lg:grid-cols-[0.7fr_1.3fr] gap-[clamp(32px,6vw,64px)] items-start">
        <div className="grid justify-items-start">
          <p className="text-[#ffc85c] text-xs font-black tracking-[0.16em] uppercase mb-4">Contact Nature&apos;s Dates</p>
          <h2 id="contact-form-title" className="m-0 text-white text-[clamp(48px,5vw,72px)] leading-[0.88] tracking-[-0.06em]">Let&apos;s get your question to the right place.</h2>
          <p className="mt-[22px] text-white/72 text-base leading-[1.7]">Choose a topic and share the useful details. This form prepares a complete email draft for you to review and send.</p>
          <a href="mailto:contact@naturesdates.com" className="inline-flex items-center gap-[9px] mt-6 border-b border-white/36 pb-[7px] text-white font-black">
            <Mail size={18} /> contact@naturesdates.com
          </a>
          <div className="grid gap-[11px] w-full mt-[30px]">
            <article className="grid grid-cols-[28px_1fr] gap-3 border border-white/13 rounded-[16px] p-4 bg-white/6">
              <PackageSearch size={21} className="text-[#ffc85c]" />
              <div>
                <strong className="block text-white text-xs">Product support</strong>
                <span className="block mt-1 text-white/64 text-xs leading-[1.55]">Include the product, package code, purchase location and what happened.</span>
              </div>
            </article>
            <article className="grid grid-cols-[28px_1fr] gap-3 border border-white/13 rounded-[16px] p-4 bg-white/6">
              <Building2 size={21} className="text-[#ffc85c]" />
              <div>
                <strong className="block text-white text-xs">Wholesale &amp; retail</strong>
                <span className="block mt-1 text-white/64 text-xs leading-[1.55]">Include your company, region, estimated quantity and preferred format.</span>
              </div>
            </article>
          </div>
          <p className="mt-[22px] border-l-3 border-[#ffc85c] pl-[15px] text-white/66 text-xs leading-[1.65]">
            <strong className="text-white">A quick privacy note:</strong> Do not include payment details, passwords, medical records or other sensitive personal information.
          </p>
        </div>
        <form className="grid gap-[17px] p-[clamp(25px,4vw,42px)] rounded-[20px_42px_20px_20px] bg-[#fff8f1] text-[#1B4D3E] shadow-[0_30px_70px_rgba(33,15,8,0.25)]" onSubmit={submit} noValidate>
          <div className="flex items-center justify-between gap-4 border-b border-[#e6d6c9] pb-[18px] col-span-full">
            <span className="text-[22px] font-black text-[#663620]">Tell us a little more</span>
            <strong className="text-[10px] uppercase text-[#9a7b69]">Fields marked * are required.</strong>
          </div>
          <label className="grid gap-[7px] text-xs font-black tracking-[0.025em] text-[#674431]">
            Name *
            <input name="name" autoComplete="name" minLength={2} placeholder="Your full name" required className="w-full min-h-[49px] border border-[rgba(102,59,38,0.18)] rounded-[12px] px-3.5 py-3 bg-white text-[#1B4D3E] font-sans text-sm outline-none transition-all duration-200 focus:border-[#c94e26] focus:shadow-[0_0_0_3px_rgba(201,78,38,0.12)]" />
          </label>
          <label className="grid gap-[7px] text-xs font-black tracking-[0.025em] text-[#674431]">
            Email *
            <input name="email" type="email" autoComplete="email" placeholder="you@example.com" required className="w-full min-h-[49px] border border-[rgba(102,59,38,0.18)] rounded-[12px] px-3.5 py-3 bg-white text-[#1B4D3E] font-sans text-sm outline-none transition-all duration-200 focus:border-[#c94e26] focus:shadow-[0_0_0_3px_rgba(201,78,38,0.12)]" />
          </label>
          <label className="grid gap-[7px] text-xs font-black tracking-[0.025em] text-[#674431]">
            Company or organization
            <input name="company" autoComplete="organization" placeholder="Optional" className="w-full min-h-[49px] border border-[rgba(102,59,38,0.18)] rounded-[12px] px-3.5 py-3 bg-white text-[#1B4D3E] font-sans text-sm outline-none transition-all duration-200 focus:border-[#c94e26] focus:shadow-[0_0_0_3px_rgba(201,78,38,0.12)]" />
          </label>
          <label className="grid gap-[7px] text-xs font-black tracking-[0.025em] text-[#674431]">
            City and country
            <input name="location" autoComplete="address-level2 country-name" placeholder="Helpful for availability questions" className="w-full min-h-[49px] border border-[rgba(102,59,38,0.18)] rounded-[12px] px-3.5 py-3 bg-white text-[#1B4D3E] font-sans text-sm outline-none transition-all duration-200 focus:border-[#c94e26] focus:shadow-[0_0_0_3px_rgba(201,78,38,0.12)]" />
          </label>
          <label className="grid gap-[7px] text-xs font-black tracking-[0.025em] text-[#674431] col-span-full">
            Inquiry type *
            <select name="topic" defaultValue="General inquiry" className="w-full min-h-[49px] border border-[rgba(102,59,38,0.18)] rounded-[12px] px-3.5 py-3 bg-white text-[#1B4D3E] font-sans text-sm outline-none transition-all duration-200 focus:border-[#c94e26] focus:shadow-[0_0_0_3px_rgba(201,78,38,0.12)]">
              <option>General inquiry</option>
              <option>Customer support inquiry</option>
              <option>Wholesale inquiry</option>
              <option>Retail partnership inquiry</option>
              <option>Press inquiry</option>
            </select>
          </label>
          <label className="col-span-full hidden" aria-hidden="true">
            Website
            <input name="website" tabIndex={-1} autoComplete="off" />
          </label>
          <label className="grid gap-[7px] text-xs font-black tracking-[0.025em] text-[#674431] col-span-full">
            How can we help? *
            <textarea name="message" rows={7} minLength={10} placeholder="For product support, include the exact product, package details, where you bought it and a clear description." required className="w-full min-h-[160px] border border-[rgba(102,59,38,0.18)] rounded-[12px] px-3.5 py-3 bg-white text-[#1B4D3E] font-sans text-sm outline-none resize-y transition-all duration-200 focus:border-[#c94e26] focus:shadow-[0_0_0_3px_rgba(201,78,38,0.12)]" />
          </label>
          <button className="col-span-full min-h-[48px] inline-flex items-center justify-center gap-2 border-0 rounded-full px-[18px] py-[11px] bg-[#c90235] text-white font-black cursor-pointer shadow-[0_14px_30px_rgba(193,2,48,0.2)] transition-all duration-200 hover:bg-[#a8002b]" type="submit">
            <Send size={17} /> Prepare your email
          </button>
          <small className="col-span-full text-[#927563] text-[11px] leading-[1.5] text-center">Nothing is sent automatically. You will review the draft in your email app before sending.</small>
          {status === "success" && (
            <p className="col-span-full flex items-start gap-2 text-[#1B4D3E] text-sm leading-[1.5]" role="status">
              <Check size={17} className="mt-0.5" /> Your email draft is ready. <a href={mailto} className="text-[#8B1832] font-bold underline">Open your email app to send it.</a>
            </p>
          )}
          {status === "error" && (
            <p className="col-span-full text-[#c90235] text-sm leading-[1.5]" role="alert">Please enter a valid name, email and message, then try again.</p>
          )}
        </form>
      </div>
    </section>
  );
}

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  return (
    <form
      className="flex flex-col sm:flex-row items-start sm:items-end gap-3"
      onSubmit={(event) => {
        event.preventDefault();
        window.location.href = `mailto:contact@naturesdates.com?subject=${encodeURIComponent("Newsletter interest")}&body=${encodeURIComponent(`Please add ${email} to the newsletter when subscriptions are available.`)}`;
      }}
    >
      <label htmlFor="newsletter-email" className="sr-only">Email address</label>
      <div className="flex flex-col sm:flex-row gap-2">
        <input
          id="newsletter-email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          autoComplete="email"
          placeholder="you@example.com"
          required
          className="min-h-[48px] px-4 py-3 rounded-full border border-[rgba(27,77,62,0.2)] bg-white text-[#1B4D3E] text-sm outline-none focus:border-[#8B1832]"
        />
        <button
          type="submit"
          className="min-h-[48px] inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#8B1832] text-white text-xs font-black uppercase tracking-[0.02em] shadow-[0_14px_30px_rgba(139,24,50,0.2)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_18px_38px_rgba(139,24,50,0.28)] cursor-pointer"
        >
          Join by email <Send size={15} />
        </button>
      </div>
      <small className="text-[rgba(27,77,62,0.5)] text-xs">Opens your email app. Live newsletter delivery requires a verified email provider.</small>
    </form>
  );
}
