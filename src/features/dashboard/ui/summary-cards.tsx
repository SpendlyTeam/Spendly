import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatMoneyCents } from "@/../lib/formatters";

export function SummaryCards(props: {
  totalCents: number;
  count: number;
  top3: { name: string; cents: number }[];
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader>
          <CardTitle>Total spend</CardTitle>
        </CardHeader>
        <CardContent className="text-2xl font-semibold">
          {formatMoneyCents(props.totalCents)}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Transactions</CardTitle>
        </CardHeader>
        <CardContent className="text-2xl font-semibold">
          {props.count}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Top 3 categories</CardTitle>
        </CardHeader>
        <CardContent className="space-y-1">
          {props.top3.length === 0 ? (
            <div className="text-sm text-muted-foreground">No data</div>
          ) : (
            props.top3.map((c) => (
              <div
                key={c.name}
                className="flex items-center justify-between text-sm"
              >
                <span>{c.name}</span>
                <span className="font-medium">{formatMoneyCents(c.cents)}</span>
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
}
