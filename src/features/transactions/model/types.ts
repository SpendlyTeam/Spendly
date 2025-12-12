export type TransactionUI = {
  id: number;
  amountCents: number;
  date: string;
  description?: string | null;
  category: { id: number; name: string; slug: string; color?: string | null };
};

export type CategoryUI = {
  id: number;
  name: string;
  slug: string;
  color?: string | null;
};
