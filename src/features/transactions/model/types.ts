export type TransactionUI = {
  id: string;
  amountCents: number;
  date: string;
  description?: string | null;
  category: { id: string; name: string; slug: string; color?: string | null };
};

export type CategoryUI = {
  id: string;
  name: string;
  slug: string;
  color?: string | null;
};
