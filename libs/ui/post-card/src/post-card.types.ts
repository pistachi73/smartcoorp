export type PostCardProps = {
  /** Post title */
  title?: string;
  /**Post description */
  description?: string;
  /** Post reading time */
  readingTime: number;
  /** Updated date */
  updatedAt: Date;
};

export type PostCardListProps = {
  posts: PostCardProps[];
};
