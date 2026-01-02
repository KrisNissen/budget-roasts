import { useSnark } from "@/lib/snark-context";
import { getRandomRoast, dailyRoasts, getShameLabel } from "@/lib/roasts";
import { mockNetWorthData, mockBurnRateData, getShameTransactions, getTotalSpent, getTotalBudget } from "@/lib/mock-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from "recharts";
import { TrendingUp, TrendingDown, Flame, AlertTriangle } from "lucide-react";
import { useMemo } from "react";

export default function Index() {
  const { snarkLevel } = useSnark();
  
  const dailyRoast = useMemo(() => getRandomRoast(dailyRoasts, snarkLevel), [snarkLevel]);
  const shameTransactions = getShameTransactions();
  const totalSpent = getTotalSpent();
  const totalBudget = getTotalBudget();
  const spendingPercentage = Math.round((totalSpent / totalBudget) * 100);
  const isOverBudget = totalSpent > totalBudget;

  return (
    <div className="space-y-6">
      {/* Judgement Banner */}
      <Card className={`border-2 ${isOverBudget ? "border-destructive animate-shame-pulse" : "border-primary"}`}>
        <CardContent className="py-6">
          <div className="flex items-start gap-4">
            <div className={`flex h-12 w-12 items-center justify-center rounded-full ${
              isOverBudget ? "bg-destructive/20" : "bg-primary/20"
            }`}>
              {isOverBudget ? (
                <AlertTriangle className="h-6 w-6 text-destructive" />
              ) : (
                <Flame className="h-6 w-6 text-primary" />
              )}
            </div>
            <div className="flex-1">
              <h2 className="font-display text-lg font-semibold text-foreground">
                Daily Judgement
              </h2>
              <p className={`mt-1 text-lg ${
                snarkLevel === "nuclear" ? "text-destructive" : 
                snarkLevel === "medium" ? "text-accent" : "text-muted-foreground"
              }`}>
                "{dailyRoast}"
              </p>
            </div>
            <Badge variant={isOverBudget ? "destructive" : "default"} className="text-sm">
              {spendingPercentage}% spent
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Charts Row */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Net Worth Chart */}
        <Card className="animate-fade-in-up">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-base font-medium">Net Worth</CardTitle>
            <div className="flex items-center gap-1 text-sm text-primary">
              <TrendingUp className="h-4 w-4" />
              <span>+$2,300</span>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={mockNetWorthData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis 
                    dataKey="month" 
                    stroke="hsl(var(--muted-foreground))" 
                    fontSize={12}
                  />
                  <YAxis 
                    stroke="hsl(var(--muted-foreground))" 
                    fontSize={12}
                    tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                    labelStyle={{ color: "hsl(var(--foreground))" }}
                    formatter={(value: number) => [`$${value.toLocaleString()}`, "Net Worth"]}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="netWorth" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={2}
                    dot={{ fill: "hsl(var(--primary))", strokeWidth: 0 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Burn Rate Chart */}
        <Card className="animate-fade-in-up animate-stagger-1">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-base font-medium">Burn Rate</CardTitle>
            <div className="flex items-center gap-1 text-sm text-destructive">
              <TrendingDown className="h-4 w-4" />
              <span>-$300 deficit</span>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={mockBurnRateData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis 
                    dataKey="month" 
                    stroke="hsl(var(--muted-foreground))" 
                    fontSize={12}
                  />
                  <YAxis 
                    stroke="hsl(var(--muted-foreground))" 
                    fontSize={12}
                    tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                    labelStyle={{ color: "hsl(var(--foreground))" }}
                    formatter={(value: number) => [`$${value.toLocaleString()}`, ""]}
                  />
                  <Legend />
                  <Bar dataKey="income" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} name="Income" />
                  <Bar dataKey="expenses" fill="hsl(var(--destructive))" radius={[4, 4, 0, 0]} name="Expenses" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Hall of Shame */}
      <Card className="animate-fade-in-up animate-stagger-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span className="text-2xl">🔥</span>
            Hall of Shame
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {shameTransactions.map((transaction, index) => (
              <div
                key={transaction.id}
                className={`flex items-center justify-between rounded-lg border border-destructive/30 bg-destructive/5 p-4 animate-slide-in-right`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-destructive/20 text-lg">
                    {index === 0 ? "🏆" : index === 1 ? "🥈" : "🥉"}
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{transaction.merchant}</p>
                    <p className="text-sm text-muted-foreground">{transaction.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-display text-lg font-bold text-destructive">
                    -${transaction.amount.toFixed(2)}
                  </p>
                  <Badge variant="outline" className="border-destructive/50 text-destructive">
                    {getShameLabel(snarkLevel)}
                  </Badge>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Audacity Score: {transaction.audacityScore}%
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
