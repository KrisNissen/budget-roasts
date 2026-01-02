import { mockTransactions } from "@/lib/mock-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export default function Transactions() {
  return (
    <div className="space-y-6">
      <Card className="animate-fade-in-up">
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {mockTransactions.map((transaction, index) => (
              <div
                key={transaction.id}
                className={cn(
                  "flex items-center justify-between p-4 rounded-lg border transition-all animate-fade-in-up",
                  transaction.isShameworthy 
                    ? "border-destructive/30 bg-destructive/5" 
                    : "border-border bg-card"
                )}
                style={{ animationDelay: `${index * 0.03}s` }}
              >
                <div className="flex items-center gap-4">
                  <div className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-full text-sm font-medium",
                    transaction.isShameworthy 
                      ? "bg-destructive/20 text-destructive" 
                      : "bg-secondary text-secondary-foreground"
                  )}>
                    {transaction.category.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{transaction.merchant}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <p className="text-sm text-muted-foreground">{transaction.category}</p>
                      <span className="text-muted-foreground">·</span>
                      <p className="text-sm text-muted-foreground">{transaction.date}</p>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className={cn(
                    "font-display font-bold",
                    transaction.isShameworthy ? "text-destructive" : "text-foreground"
                  )}>
                    -${transaction.amount.toFixed(2)}
                  </p>
                  {transaction.isShameworthy && (
                    <Badge variant="destructive" className="mt-1 text-xs">
                      Shameful
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
