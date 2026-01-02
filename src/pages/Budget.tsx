import { useState } from "react";
import { useSnark } from "@/lib/snark-context";
import { getBudgetRoast } from "@/lib/roasts";
import { mockBudgets } from "@/lib/mock-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Check, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Budget() {
  const { snarkLevel } = useSnark();
  const [feltCategories, setFeltCategories] = useState<Set<string>>(new Set());

  const handleMarkAsFelt = (category: string) => {
    setFeltCategories(prev => new Set([...prev, category]));
  };

  const totalAllocated = mockBudgets.reduce((sum, b) => sum + b.allocated, 0);
  const totalSpent = mockBudgets.reduce((sum, b) => sum + b.spent, 0);

  return (
    <div className="space-y-6">
      {/* Summary Card */}
      <Card className="animate-fade-in-up">
        <CardHeader>
          <CardTitle>Budget vs. Reality</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-muted-foreground">Total Budget</p>
              <p className="text-2xl font-display font-bold text-foreground">
                ${totalAllocated.toLocaleString()}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Total Spent</p>
              <p className={cn(
                "text-2xl font-display font-bold",
                totalSpent > totalAllocated ? "text-destructive" : "text-primary"
              )}>
                ${totalSpent.toLocaleString()}
              </p>
            </div>
          </div>
          <Progress 
            value={Math.min((totalSpent / totalAllocated) * 100, 100)} 
            className={cn(
              "h-3",
              totalSpent > totalAllocated && "animate-shame-pulse"
            )}
          />
          {totalSpent > totalAllocated && (
            <p className="mt-2 text-sm text-destructive flex items-center gap-1">
              <AlertTriangle className="h-4 w-4" />
              ${(totalSpent - totalAllocated).toLocaleString()} over budget
            </p>
          )}
        </CardContent>
      </Card>

      {/* Category Breakdown */}
      <div className="grid gap-4 md:grid-cols-2">
        {mockBudgets.map((budget, index) => {
          const percentage = (budget.spent / budget.allocated) * 100;
          const isOverBudget = budget.spent > budget.allocated;
          const isFelt = feltCategories.has(budget.category);
          const roast = getBudgetRoast(budget.category, snarkLevel);

          return (
            <Card 
              key={budget.category}
              className={cn(
                "animate-fade-in-up transition-all duration-300",
                isOverBudget && !isFelt && "border-destructive animate-shame-pulse"
              )}
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <CardContent className="pt-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{budget.icon}</span>
                    <div>
                      <h3 className="font-medium text-foreground">{budget.category}</h3>
                      <p className="text-sm text-muted-foreground">
                        ${budget.spent} of ${budget.allocated}
                      </p>
                    </div>
                  </div>
                  <Badge 
                    variant={isOverBudget ? "destructive" : percentage > 80 ? "secondary" : "default"}
                  >
                    {Math.round(percentage)}%
                  </Badge>
                </div>

                {/* Progress Bars Side by Side */}
                <div className="space-y-2">
                  <div className="flex gap-2 items-center">
                    <span className="text-xs text-muted-foreground w-16">Budget</span>
                    <div className="flex-1 h-2 rounded-full bg-secondary overflow-hidden">
                      <div 
                        className="h-full bg-muted-foreground/30 rounded-full"
                        style={{ width: "100%" }}
                      />
                    </div>
                  </div>
                  <div className="flex gap-2 items-center">
                    <span className="text-xs text-muted-foreground w-16">Spent</span>
                    <Tooltip delayDuration={600}>
                      <TooltipTrigger asChild>
                        <div className="flex-1 h-2 rounded-full bg-secondary overflow-hidden cursor-help">
                          <div 
                            className={cn(
                              "h-full rounded-full transition-all duration-500",
                              isOverBudget ? "bg-destructive" : "bg-primary"
                            )}
                            style={{ width: `${Math.min(percentage, 100)}%` }}
                          />
                        </div>
                      </TooltipTrigger>
                      <TooltipContent 
                        side="top" 
                        className={cn(
                          "max-w-xs text-sm",
                          snarkLevel === "nuclear" && "bg-destructive text-destructive-foreground"
                        )}
                      >
                        {isOverBudget ? roast : `${Math.round(100 - percentage)}% remaining`}
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </div>

                {/* Roast Message for Over Budget */}
                {isOverBudget && !isFelt && (
                  <div className="mt-4 p-3 rounded-lg bg-destructive/10 border border-destructive/20">
                    <p className={cn(
                      "text-sm",
                      snarkLevel === "nuclear" ? "text-destructive font-medium" : 
                      snarkLevel === "medium" ? "text-accent" : "text-muted-foreground"
                    )}>
                      {roast}
                    </p>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="mt-2 text-xs"
                      onClick={() => handleMarkAsFelt(budget.category)}
                    >
                      <Check className="h-3 w-3 mr-1" />
                      Mark as Felt
                    </Button>
                  </div>
                )}

                {isFelt && (
                  <p className="mt-4 text-sm text-muted-foreground italic">
                    Acknowledged. The shame has been noted.
                  </p>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
