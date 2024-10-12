export const authors = [
  {
    id: 1,
    name: "James Clear",
    image: "/authors/james.jpg",
  },
  {
    id: 2,
    name: "Colleen Hoover",
    image: "/authors/hoover.jpg",
  },
  {
    id: 3,
    name: "Sajni Patel",
    image: "/authors/patel.jpg",
  },
  {
    id: 4,
    name: "Taylor Jenkins Reid",
    image: "/authors/reid.jpg",
  },
  {
    id: 5,
    name: "Napolen Hill",
    image: "/authors/hill.jpg",
  },
  {
    id: 6,
    name: "Chris Voss",
    image: "/authors/voss.jpg",
  },
  {
    id: 7,
    name: "Vex King",
    image: "/authors/king.jpg",
  },
  {
    id: 8,
    name: "Juliette Aristides",
    image: "/authors/j.jpg",
  },
].sort((a, b) => (a.name > b.name ? 1 : -1));
