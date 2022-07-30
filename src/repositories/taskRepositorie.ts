export interface TaskRepositorie {
  id: string;
  name: string;
  slug: string;
  finished: boolean;
  finishedAt?: Date;
  createdAt: Date;
}
