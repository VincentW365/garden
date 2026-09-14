# A Garden That Only Exists for Her

A small, private web experience built as an alternative to physical flowers.
Physical flowers die. This garden keeps growing.

Built with Next.js 16, TypeScript and Tailwind CSS. No backend, no login,
no analytics, no cookies, no third-party scripts.

---

## 1. Personalise it (the only file you need to touch)

Everything she reads lives in **`garden.config.ts`** at the project root.

| What                              | Where in the file                       |
| --------------------------------- | --------------------------------------- |
| Her name, your name, nickname     | `herName`, `myName`, `nickname`         |
| Phone number for "Call me"        | `phoneNumber` (e.g. `"+15555550123"`)   |
| Optional date carved on the bench | `importantDate`                         |
| Opening lines                     | `intro.lines`, `intro.touchPrompt`      |
| The flowers and their messages    | `flowers[]`                             |
| The hidden flower + letter        | `secretFlower.letter`                   |
| Bench message / carving           | `bench.message`, `bench.carving`        |
| The star's tiny message           | `hiddenDetails.starMessage`             |
| Mood check-in responses           | `mood.responses`                        |
| Final message + sign-off          | `finalMessage.lines`, `finalMessage.signOff` |
| Ambient audio file                | `audio.src`                             |
| Interface wording                 | `growing`, `ui`                         |

Every message already has a first draft written in your voice. Read each
one and change anything that isn't true for the two of you. The one that
most needs your own words is "A memory I keep replaying". Anywhere in a
message you can write `{herName}`, `{myName}` or `{nickname}` and the real
name is filled in.

**Quotes:** a flower can carry a quotation above your note:

```ts
quote: { text: "You pierce my soul. I am half agony, half hope.", author: "Jane Austen, Persuasion" },
message: "That is exactly what it felt like, waiting to find out whether you felt it too.",
```

The three included are public-domain lines (Brontë, Austen, Barrett Browning).

**Paragraphs:** leave a blank line between them. In a normal string that is
`\n\n`; or use a template literal (backticks) and just press Enter twice.

```ts
{
  id: "memory-1",
  flowerType: "tulip",
  title: "A memory I keep replaying",
  message: `That night on the pier when the rain started.

You laughed first. I still think about that.`,
}
```

**Optional image on a card:** put the file in `public/images/` and add
`image: { src: "/images/pier.jpg", alt: "The pier that night" }` to a flower.

**Ambient audio:** put a file in `public/audio/` and set
`audio.src: "/audio/garden.mp3"`. Nothing autoplays. A small toggle appears
in the top-right corner only when a file is configured.

### Adding a flower later ("the garden can keep growing")

Copy any object in `flowers[]`, give it a new unique `id`, choose a
`flowerType` and write the `title` and `message`. That's all. The garden
lays it out on its own. Flower types:

`rose` · `tulip` · `daisy` · `lily` · `sunflower` · `lavender` · `wildflower` · `moonflower`

Each type has two colour variants: `variant: "a"` (default) or `"b"`.

### Pacing knobs

- `mood.afterFlowersOpened` (default 3): when the mood check-in appears.
- `finalMessage.afterFlowersOpened` (default 6): when the final message unlocks.
- `secretFlower.plantAt` (default 6): where in the planting order the hidden flower grows.

---

## 2. Run it locally

```bash
npm install
npm run dev
```

Open http://localhost:3000 on your computer, or on your phone using the
"Network" address printed in the terminal (same Wi-Fi).

Production check:

```bash
npm run build
npm run start
```

---

## 3. Deploy for free (Vercel)

1. Push this folder to a GitHub repository (private is fine).
2. Go to https://vercel.com, "Add New Project", import the repository.
3. Leave every setting at its default (framework: Next.js). Click Deploy.
4. You get a URL like `https://your-project.vercel.app`. Send her that link.

Every time you edit `garden.config.ts` and push, Vercel redeploys in about a
minute. That is how the garden grows over time.

Netlify, Cloudflare Pages and Railway also work with the defaults.

The page is marked `noindex`, so search engines won't list it.

---

## 4. The journey she takes

1. **Dark, quiet sky.** Three lines appear one after another, then
   "Touch the screen."
2. **Her first touch** grows the first flower from the ground, where she
   touched. A soft hint invites her to touch the flower.
3. **Each flower opens a card** with one message category. Closing the first
   card hints that touching the ground plants another. A "Plant another"
   button appears as a second way in. The sky warms as the garden fills.
4. **After three flowers** the mood check-in asks how she is feeling. Each of
   the four answers gets its own response; "I just need you" offers
   "Call me" on a phone (when a number is configured).
5. **One flower is different.** Paler, faintly luminous, an occasional
   sparkle. Tapping it says "You found this one." and then reveals the letter.
6. **After six flowers**, "There's one more thing." appears at the bottom.
   It opens the final message, one line at a time, ending with your sign-off.
7. **The garden stays.** "This garden can keep growing." remains at the
   bottom. When she has planted everything, it says more is coming.

Small things to discover, never announced: the bench (two figures, initials
and date carved into it, a message when tapped), one star that answers when
touched, the moon (changes the atmosphere and calls a golden firefly that
follows her touch for a while).

---

## 5. Project layout

```
garden.config.ts            <- all personal content
src/app/layout.tsx          <- fonts, metadata, viewport
src/app/page.tsx
src/app/globals.css         <- design tokens, animation system, reduced-motion rules
src/components/
  GardenExperience.tsx      <- orchestrates the whole journey
  Intro.tsx, SequentialText.tsx
  Sky.tsx, Ground.tsx, Bench.tsx
  Flower.tsx                <- stem / leaves / bloom growth, sway, tap target
  flowers/                  <- one file per flower shape + registry (index.ts)
  Sheet.tsx                 <- accessible modal shell (focus trap, Escape, exit animation)
  MessageCard.tsx, MoodCheckIn.tsx, FinalMessage.tsx, AudioToggle.tsx
src/lib/                    <- types, slot layout, seeded random, text helpers
src/hooks/useMediaQuery.ts  <- reduced-motion / touch detection
```

Accessibility: every interactive element is a real button with a label,
touch targets are 44px or larger, modals trap and restore focus and close
with Escape or a backdrop tap, and `prefers-reduced-motion` replaces growth
and sway with gentle fades.
