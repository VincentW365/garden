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
 *  Line breaks: a blank line between stanzas becomes a new paragraph;
 *  single line breaks are kept as they are.
 *
 *  Flower types available:
 *    "rose" | "tulip" | "daisy" | "lily" | "sunflower" | "lavender"
 *    | "wildflower" | "moonflower"
 *  Each type also has a colour `variant`: "a" (default) or "b".
 *
 *  This version of the garden is an apology. Each flower holds one part
 *  of it, in order. The hidden flower holds the whole poem in one piece.
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

  // "Call me" — shown on phones when she picks the last mood option.
  phoneNumber: "8763817659",

  importantDate: "05 . 01 . 2001",
  relationshipStartDate: "",

  siteTitle: "An apology for {nickname}",

  audio: {
    src: "",
    label: "Garden ambience",
  },

  // ------------------------------------------------------------------
  // Opening sequence
  // ------------------------------------------------------------------
  intro: {
    seal: {
      eyebrow: "Delivered by hand",
      headline: "An apology\nhas been issued",
      to: "to {nickname}",
      from: "from {myName}, with all of his heart",
      monogram: "B",
      prompt: "Touch to break the seal.",
    },
    lines: [
      "{nickname}, before anything else…",
      "I'm sorry.",
      "Not the kind of sorry that asks you to hurry.",
      "Just the truth, planted somewhere soft, for you to find.",
    ],
    touchPrompt: "Touch the ground. Every flower holds a piece of it.",
  },

  // ------------------------------------------------------------------
  // The apology, one flower at a time.
  // ------------------------------------------------------------------
  flowers: [
    {
      id: "apology-1",
      flowerType: "rose",
      title: "Every passing moment",
      message: `Somehow, through every passing moment,
You're the only thing on my mind.

And maybe that's what hurts the most,
The part I struggle to understand,
How I was still dreaming of forever,
While you were learning to let go of my hand.

How the thought of someone else
Could find a place inside your day,
When even in our darkest moments,
My heart never looked another way.`,
    },
    {
      id: "apology-2",
      flowerType: "tulip",
      title: "I was wrong",
      message: `I know we weren't together,
And I know that I was wrong.
I crossed a line I never should have,
And I'm sorry for the hurt I caused.

You had every right to walk away,
Every right to try to heal,
And I would never take that from you,
No matter how much pain I feel.`,
    },
    {
      id: "apology-3",
      flowerType: "lavender",
      title: "Every road still led to you",
      message: `But if you could have lived inside my mind,
For even just a moment or two,
You'd know that through the silence,
Every road still led to you.

When we weren't speaking,
You were still the voice I longed to hear.

When the world kept moving forward,
And everyone went on with their lives,
I was still somewhere in our memories.`,
    },
    {
      id: "apology-4",
      flowerType: "lily",
      variant: "b",
      title: "Two hearts, different pain",
      message: `And maybe love isn't measured
By who can move on or who remains,
Maybe two hearts can love each other
And still respond differently to pain.

I don't want to make you feel guilty
For the choices you were free to make,
I'm just trying to explain the feeling
Of a heart that quietly aches.`,
    },
    {
      id: "apology-5",
      flowerType: "wildflower",
      variant: "b",
      title: "The name my heart knows",
      message: `You're the name my heart knows by itself,
And when I picture love and happiness,
I don't picture anybody else.

And I know love is more than feelings,
More than poetry, promises, or tears.
It's learning how to love you safely,
And showing change.`,
    },
    {
      id: "apology-6",
      flowerType: "rose",
      variant: "b",
      title: "Responsibility",
      message: `I can't undo the hurt I've caused,
Or ask you to forget what you've been through,
But I can take responsibility
And become someone better, too.`,
    },
    {
      id: "apology-7",
      flowerType: "tulip",
      variant: "b",
      title: "Something about your light",
      message: `So if sometimes I seem a little quiet,
If there's sadness behind my smile,
It's not because I want to blame you,
It's just that I am learning

That the heart I hold so dear
Can choose a life beyond my own,
And that truth awakens fear.

Not because you belong to me,
Not because you owe me forever,
But because there's something about your light
That makes my world feel better.`,
    },
  ],

  // ------------------------------------------------------------------
  // The hidden flower: the whole apology, unbroken.
  // ------------------------------------------------------------------
  secretFlower: {
    id: "secret",
    flowerType: "moonflower",
    plantAt: 7,
    foundText: "All of it, in one place.",
    letter: `{nickname},

Somehow, through every passing moment,
You're the only thing on my mind.
And maybe that's what hurts the most,
The part I struggle to understand,
How I was still dreaming of forever,
While you were learning to let go of my hand.

How the thought of someone else
Could find a place inside your day,
When even in our darkest moments,
My heart never looked another way.

I know we weren't together,
And I know that I was wrong.
I crossed a line I never should have,
And I'm sorry for the hurt I caused.

You had every right to walk away,
Every right to try to heal,
And I would never take that from you,
No matter how much pain I feel.

But if you could have lived inside my mind,
For even just a moment or two,
You'd know that through the silence,
Every road still led to you.

When we weren't speaking,
You were still the voice I longed to hear.
When the world kept moving forward,
And everyone went on with their lives,
I was still somewhere in our memories,

And maybe love isn't measured
By who can move on or who remains,
Maybe two hearts can love each other
And still respond differently to pain.

I don't want to make you feel guilty
For the choices you were free to make,
I'm just trying to explain the feeling
Of a heart that quietly aches.

You're the name my heart knows by itself,
And when I picture love and happiness,
I don't picture anybody else.

And I know love is more than feelings,
More than poetry, promises, or tears.
It's learning how to love you safely,
And showing change.

I can't undo the hurt I've caused,
Or ask you to forget what you've been through,
But I can take responsibility
And become someone better, too.

So if sometimes I seem a little quiet,
If there's sadness behind my smile,
It's not because I want to blame you,
It's just that I am learning
That the heart I hold so dear
Can choose a life beyond my own,
And that truth awakens fear.

Not because you belong to me,
Not because you owe me forever,
But because there's something about your light
That makes my world feel better.

{myName}`,
  },

  // ------------------------------------------------------------------
  // The bench
  // ------------------------------------------------------------------
  bench: {
    message:
      "I'll be right here, however long it takes. No pressure. No rush. Just a seat saved for you.",
    carving: "",
  },

  hiddenDetails: {
    starMessage:
      "Through every silence, every road still led to you. Even the ones lit only by stars.",
  },

  // ------------------------------------------------------------------
  // Mood check-in
  // ------------------------------------------------------------------
  mood: {
    afterFlowersOpened: 3,
    prompt: "How is your heart, reading this?",
    options: {
      bad: { emoji: "🥀", label: "Still hurting" },
      meh: { emoji: "🌫️", label: "Not sure yet" },
      better: { emoji: "🌷", label: "A little softer" },
      needYou: { emoji: "❤️", label: "I want to talk" },
    },
    responses: {
      bad: [
        "That's okay. You're allowed to still be hurt.",
        "I'm not asking you to be past it.",
        "I just wanted you to know I'm sorry.",
      ],
      meh: [
        "You don't have to know yet.",
        "Take all the time you need.",
        "The garden will wait. So will I.",
      ],
      better: ["Thank you for staying with it this far.", "That means more than you know."],
      needYou: ["I'm here.", "Whenever you're ready, call me. ❤️"],
    },
    actions: {
      backToGarden: "Back to the garden",
      findAnother: "Find the next flower",
      callMe: "Call me",
      notNow: "Not now",
    },
  },

  // ------------------------------------------------------------------
  // Final message
  // ------------------------------------------------------------------
  finalMessage: {
    afterFlowersOpened: 7,
    prompt: "There's one more thing, {nickname}.",
    lines: [
      "If you are seeing this…",
      "I don't want to fight anymore.",
      "I just want you here with me.",
    ],
    signOff: "— {myName}",
  },

  growing: {
    buttonLabel: "Plant the next one",
    note: "Each flower holds a piece of my apology.",
    allPlantedNote: "Every word is planted now. Somewhere, one flower glows a little paler.",
  },

  ui: {
    touchFlowerHint: "Touch the flower. It's holding the first words.",
    touchGroundHint: "Touch the ground to plant the next part.",
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
