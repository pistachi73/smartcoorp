export type KeysOfUnion<T> = T extends T ? keyof T : never;
export type UnionToIntersection<U> = (
  U extends any ? (k: U) => void : never
) extends (k: infer I) => void
  ? I
  : never;

// Flattens two union types into a single type with optional values
// i.e. FlattenUnion<{ a: number, c: number } | { b: string, c: number }> = { a?: number, b?: string, c: number }
export type FlattenUnion<T> = {
  [K in keyof UnionToIntersection<T>]: K extends keyof T
    ? T[K] extends any[]
      ? T[K]
      : T[K] extends object
      ? FlattenUnion<T[K]>
      : T[K]
    : UnionToIntersection<T>[K] | undefined;
};

export type Merge<A, B> = {
  [K in keyof A]: K extends keyof B ? B[K] : A[K];
} & B extends infer O
  ? { [K in keyof O]: O[K] }
  : never;

export type ExactlyOneKey<K extends keyof any, V, KK extends keyof any = K> = {
  [P in K]: { [Q in P]: V } & { [Q in Exclude<KK, P>]?: never } extends infer O
    ? { [Q in keyof O]: O[Q] }
    : never;
}[K];

export type Entries<T> = { [K in keyof T]: [K, T[K]] }[keyof T];
