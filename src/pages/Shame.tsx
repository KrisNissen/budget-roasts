import { useSnark } from "@/lib/snark-context";
import { getShameLabel } from "@/lib/roasts";
import { mockTransactions } from "@/lib/mock-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function Shame() {
  const { snarkLevel } = useSnark();
  
  const shameTransactions = mockTransactions
    .filter(t => t.isShameworthy)
    .sort((a, b) => (b.audacityScore || 0) - (a.audacityScore || 0));

  const totalShame = shameTransactions.reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="space-y-6">
      {/* Shame Summary */}
      <Card className="border-destructive animate-fade-in-up">
        <CardContent className="py-8 text-center">
          <p className="text-sm text-muted-foreground uppercase tracking-wider">Total Shame Value</p>
          <p className="mt-2 font-display text-5xl font-bold text-destructive">
            ${totalShame.toFixed(2)}
          </p>
          <p className="mt-2 text-muted-foreground">
            {shameTransactions.length} questionable decisions this month
          </p>
        </CardContent>
      </Card>

      {/* Full Hall of Shame */}
      <Card className="animate-fade-in-up animate-stagger-1">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span className="text-2xl">🔥</span>
            Complete Hall of Shame
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {shameTransactions.map((transaction, index) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between rounded-lg border border-destructive/30 bg-destructive/5 p-4 animate-slide-in-right"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-destructive/20 text-xl">
                    {index === 0 ? "🏆" : index === 1 ? "🥈" : index === 2 ? "🥉" : "💸"}
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{transaction.merchant}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline" className="text-xs">
                        {transaction.category}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{transaction.date}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-display text-xl font-bold text-destructive">
                    -${transaction.amount.toFixed(2)}
                  </p>
                  <Badge variant="destructive" className="mt-1">
                    {getShameLabel(snarkLevel)}
                  </Badge>
                  <div className="mt-2 flex items-center justify-end gap-1">
                    <span className="text-xs text-muted-foreground">Audacity:</span>
                    <div className="h-2 w-16 rounded-full bg-secondary overflow-hidden">
                      <div 
                        className="h-full bg-destructive rounded-full"
                        style={{ width: `${transaction.audacityScore}%` }}
                      />
                    </div>
                    <span className="text-xs font-medium text-destructive">
                      {transaction.audacityScore}%
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
