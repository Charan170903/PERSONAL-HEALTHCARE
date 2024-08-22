import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import HealthForm from "./HealthForm";

export function FormComponent() {
  return (
    <div className="container border rounded-md shadow-lg bg-neutral-100 mx-auto py-12 px-4 md:px-6">
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Health & Fitness Tracker</h1>
          <p className="text-muted-foreground">
            Track your key health metrics and get personalized recommendations.
          </p>
        </div>

        <HealthForm />
      </div>
    </div>
  );
}
