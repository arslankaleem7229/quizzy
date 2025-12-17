export const avatars = Array.from({ length: 20 }, (_, i) => ({
  image: `/avatars/${i + 1}.jpg`,
  index: i,
}));
