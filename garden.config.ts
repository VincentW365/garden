/**
 * ============================================================
 *  A GARDEN THAT ONLY EXISTS FOR HER — configuration
 * ============================================================
 *
 *  This is the ONLY file you need to edit to personalise the garden.
 *  Every word she reads lives here.
 *
 *  Anywhere in a message you can write {herName}, {myName} or {nickname}
 *  and it will be filled in from the names below.
 *
 *  Line breaks: put a blank line between paragraphs (use \n\n inside a
 *  string, or a template literal with real blank lines, like below).
 *
 *  Adding a flower later: copy one object in `flowers`, give it a new `id`,
 *  pick a `flowerType` and write your `title` + `message`. That's it — the
 *  garden lays it out automatically. Flower types available:
 *    "rose" | "tulip" | "daisy" | "lily" | "sunflower" | "lavender"
 *    | "wildflower" | "moonflower"
 *  Each type also has a colour `variant`: "a" (default) or "b".
 *  A flower can also carry a `quote: { text, author }` shown above the message.
 *
 *  The messages below were written as a starting point in your voice.
 *  Read every one and change anything that isn't true for the two of you —
 *  especially "A memory I keep replaying", which needs a real memory.
 * ============================================================
 */

import type { GardenConfig } from "@/lib/types";

export const gardenConfig: GardenConfig = {
  // ------------------------------------------------------------------
  // People
  // ------------------------------------------------------------------
  herName: "Shanique",
  myName: "Vincent",
  nickname: "Birch",

  // ------------------------------------------------------------------
  // "Call me" — shown on phones when she answers "I just need you".
  // International format is safest, e.g. "+18763817659". Leave "" to hide.
  // ------------------------------------------------------------------
  phoneNumber: "8763817659",

  // Optional dates. `importantDate` is carved faintly into the bench.
  importantDate: "05 . 01 . 2001", // e.g. "12 . 03 . 2024"
  relationshipStartDate: "", // e.g. "2024-03-12" (reserved for future details)

  siteTitle: "A garden for {herName}",

  // ------------------------------------------------------------------
  // Ambient audio (optional). Drop a file in /public/audio and set src.
  // Nothing autoplays; a small toggle appears only when src is set.
  // ------------------------------------------------------------------
  audio: {
    src: "", // e.g. "/audio/garden-ambience.mp3"
    label: "Garden ambience",
  },

  // ------------------------------------------------------------------
  // Opening sequence
  // ------------------------------------------------------------------
  intro: {
    lines: [
      "You asked me for flowers.",
      "I couldn't get you the ones I wanted to give you today.",
      "So I made you something that doesn't die.",
    ],
    touchPrompt: "Touch the screen.",
  },

  // ------------------------------------------------------------------
  // The flowers. Planted in this order, one per touch.
  // The secret flower (below) is slotted in at `secretFlower.plantAt`.
  // ------------------------------------------------------------------
  flowers: [
    {
      id: "love-1",
      flowerType: "rose",
      title: "Something I love about you",
      message: `I love your laugh. It shows me you don’t need permission to be happy; it tells me your joy was never meant to be contained. There is something beautiful about the way it escapes you, like even your heart forgets to be careful for a moment`,
    },
    {
      id: "memory-1",
      flowerType: "tulip",
      title: "A memory I keep replaying",
      message: `The first night we truly met, you took my hand and dragged me away with you.

I don’t think you knew what that meant to me at the time. It was such a small thing, probably something you barely thought about, but for me, it felt unbelievably intimate. Your hand wrapped around mine, you deciding that wherever you were going, I was coming with you too. There was something so natural about it, like I belonged beside you before either of us had the words to explain why.

And I remember how strange affection used to feel to me.

Remember when I used to feel weird when people hugged me? I never really knew what to do with myself. I’d stiffen up, overthink it, wait for it to be over.`,
    },
    {
      id: "better-1",
      flowerType: "lavender",
      title: "Something about you that makes my life better",
      message: `You tell me the truth even when I don’t want to hear it, and I think that’s one of the ways I know your love is real.

You don’t only tell me what will make me smile. You tell me what I need to hear, even when it may frustrate me, even when you know I might resist it at first.

And I admire that more than I probably say.

Because anyone can love the version of me that is easy to agree with. But you care enough about me to challenge me, to correct me, to make me look at myself honestly.`,
    },
    {
      id: "words-1",
      flowerType: "lily",
      variant: "b",
      title: "Words I wish I'd written for you",
      quote: {
        text: "Whatever our souls are made of, his and mine are the same.",
        author: "Emily Brontë, Wuthering Heights",
      },
      message: `I read this and stopped. It's the closest anyone has come to explaining you and me.`,
    },
    {
      id: "forget-1",
      flowerType: "rose",
      variant: "b",
      title: "Something I never want you to forget",
      message: `You are not too much. You never were.

Not your feelings. Not your fears. Not the parts of you that spill over on the days when holding everything together becomes too heavy.

You could never be a burden to me.

Your needs are not an inconvenience. Your sadness is not something you have to apologize for. And the days when you fall apart are not debts you have to repay once you feel whole again.

I don’t love you only when you are smiling, easy, light, or strong.

I love you in the quiet moments too. In the messy ones. In the moments when you doubt yourself, when you retreat, when you don’t know what to say, when all you can do is simply exist beside me.

If you forget everything else, remember this:

You never have to earn my love.

You don’t have to perform for it, prove yourself worthy of it, or be perfect enough to keep it.

You already have it.

That part is finished.

And even on the days when you are hardest on yourself, I hope you remember that I could never look at you and see someone unworthy of love.

I could never hate you.

There is too much of you that has already become precious to me. Too much of your laughter living in my favorite memories, too much of your softness in the places I feel safest, too much of you woven into the way my heart now understands love.

So come to me as you are.

Happy, tired, afraid, overwhelmed, quiet, imperfect.

You never have to become less for me to love you more.

I already chose you.

And I would choose you again, in every version of you.
.`,
    },
    {
      id: "words-2",
      flowerType: "wildflower",
      variant: "b",
      title: "Words I wish I'd written for you",
      quote: {
        text: "I cannot exist without you - I am forgetful of every thing but seeing you again - my Life seems to stop there - I see no further. You have absorb'd me. I have a sensation at the present moment as though I were dissolving... I have been astonished that Men could die Martyrs for religion - I have shudder'd at it - I shudder no more - I could be martyr'd for my Religion - Love is my religion - I could die for that - I could die for you.",
        author: "John Keats",
      },
      message: `That is exactly how I feel.`,
    },
    {
      id: "bad-days-1",
      flowerType: "tulip",
      variant: "b",
      title: "For the days when you don't feel like yourself",
      message: `Hey. It's okay.

You don't have to be bright today. You don't have to be productive or grateful or fine. You're allowed to be somewhere quiet and let the day be smaller than usual.

I've seen you on the days you didn't feel like yourself, and here's the secret: you were still you. Still worth every bit of this. The version of you that's struggling isn't a lesser version. It's one that needs to be held a little more carefully.

So let me.`,
    },
            
  ],

  // ------------------------------------------------------------------
  // The hidden flower. Slightly different glow, rare shape. Not announced.
  // `plantAt` is its position in the planting order (0 = first flower).
  // ------------------------------------------------------------------
  secretFlower: {
    id: "secret",
    flowerType: "moonflower",
    plantAt: 6,
    foundText: "You found this one.",
    letter: `{herName},

I put this one somewhere you'd have to look for it, because that's how you've always found the best parts of me. Not by asking. By paying attention.

I want to tell you something I don't say enough, because it always sounds too big for an ordinary day: you changed the shape of my life. Before you, I was fine. Fine is what you say when nobody has asked the real question. You asked the real question, and then you stayed for the answer.

I'm not good at flowers. Clearly. But I know what they're supposed to say, so let me say it plainly. I choose you on the loud days and the quiet ones. I choose you when you're sure of yourself and when you're not. I choose you when it's easy, and I choose you harder when it isn't.

You don't have to be anything for me. You don't have to be strong or okay or grateful or ready. You just have to be here, and let me love you in whatever way today allows.

That's the secret. There's no trick to it. It's just you.

Always,
{myName}`,
  },

  // ------------------------------------------------------------------
  // The bench
  // ------------------------------------------------------------------
  bench: {
    message: "You don't have to go through every bad day alone.",
    carving: "", // leave empty to carve initials from the names, e.g. "V + S"
  },

  // ------------------------------------------------------------------
  // Small hidden details
  // ------------------------------------------------------------------
  hiddenDetails: {
    // Revealed by tapping one particular star.
    starMessage:
      "If you're reading this at night, look up. I'm almost certainly under the same sky, thinking about you. It's a safe bet. I usually am.",
  },

  // ------------------------------------------------------------------
  // Mood check-in
  // ------------------------------------------------------------------
  mood: {
    afterFlowersOpened: 3,
    prompt: "How are you feeling right now?",
    options: {
      bad: { emoji: "😞", label: "Bad" },
      meh: { emoji: "😕", label: "Meh" },
      better: { emoji: "🙂", label: "Better" },
      needYou: { emoji: "❤️", label: "I just need you" },
    },
    responses: {
      bad: [
        "You don't have to be okay for me today.",
        "You don't have to explain everything either.",
        "I just wanted to give you somewhere soft to land.",
      ],
      meh: [
        "That's okay too.",
        "You don't have to magically feel better just because I made something.",
        "Go find another flower when you're ready.",
      ],
      better: ["Good. The garden is working.", "I'm taking full credit."],
      needYou: ["Then the website has done its job.", "Close it and call me. ❤️"],
    },
    actions: {
      backToGarden: "Back to the garden",
      findAnother: "Find another flower",
      callMe: "Call me",
      notNow: "Not now",
    },
  },

  // ------------------------------------------------------------------
  // Final message — one of the emotional peaks. Not shown too early.
  // ------------------------------------------------------------------
  finalMessage: {
    afterFlowersOpened: 6,
    prompt: "There's one more thing.",
    lines: [
      "These aren't the flowers you asked for.",
      "I still owe you those.",
      "This is just what I could give you today…",
      "Something made only for you.",
    ],
    signOff: "— {myName}",
  },

  // ------------------------------------------------------------------
  // Growing garden
  // ------------------------------------------------------------------
  growing: {
    buttonLabel: "Plant another",
    note: "This garden can keep growing.",
    allPlantedNote: "That's every flower for now. More will come.",
  },

  // ------------------------------------------------------------------
  // Small interface text
  // ------------------------------------------------------------------
  ui: {
    touchFlowerHint: "Touch a flower.",
    touchGroundHint: "Touch the ground to plant another.",
    close: "Close",
    backToGarden: "Back to the garden",
    audioOn: "Turn ambient sound off",
    audioOff: "Turn ambient sound on",
    moonLabel: "The moon",
    starLabel: "A star",
    benchLabel: "The bench",
    secretFlowerLabel: "A pale flower",
  },
};
