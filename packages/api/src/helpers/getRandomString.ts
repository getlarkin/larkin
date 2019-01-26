const gen8 = () =>
  Math.random()
    .toString(36)
    .slice(5)

export const getRandomString = (): string => gen8() + gen8()

export const getRandomStringLong = (): string => gen8() + gen8() + gen8() + gen8()
