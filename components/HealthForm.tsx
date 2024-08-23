"use client";

import { set, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Markdown from "react-markdown";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "./ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "./ui/button";

import { useState } from "react";
import { Label } from "./ui/label";
import { cn } from "@/lib/utils";
import Loading from "@/app/loading";

const formSchema = z.object({
  height: z.string().min(2).max(50),
  weight: z.string().min(2).max(50),
  age: z.string().min(2).max(50),
  gender: z.string().min(2).max(50),
  activity: z.string().min(2).max(50),
  water: z.string().min(1).max(3),
});

const HealthForm = () => {
  const [response, setResponse] = useState<string>();
  const [bmi, setBMI] = useState<number>();

  const [loading, setLoading] = useState<boolean>(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      height: "",
      weight: "",
      age: "",
      gender: "",
      activity: "",
      water: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    setLoading(true);

    fetch(`${process.env.NEXT_PUBLIC_HOSTNAME}/api/getResponse`, {
      method: "POST",
      body: JSON.stringify({
        ...values,
      }),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then(async (response) => {
        const botResponse = await response.json();
        console.log(botResponse);
        setResponse(botResponse.result);
        setBMI(
          Number(values.weight) /
            (((Number(values.height) / 100) * Number(values.height)) / 100)
        );
        setLoading(false);
        form.reset();
      })
      .catch((err) => {
        console.error(err);
        alert("Error Requesting bot");
        setLoading(false);
      });
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <div
      className={cn(
        response && "flex items-start flex-col md:flex-row-reverse gap-4"
      )}
    >
      {response && (
        <div className="grid gap-4 max-w-2xl">
          <div className="space-y-2">
            <Label>Recommendation</Label>
            <div className="text-muted-foreground">
              <Markdown>{response}</Markdown>
            </div>
          </div>
        </div>
      )}

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid grid-cols-2 gap-8 flex-grow sticky top-10"
        >
          <FormField
            control={form.control}
            name="height"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Height</FormLabel>
                <FormControl>
                  <Input
                    id="height"
                    type="number"
                    min={0}
                    {...field}
                    placeholder="Enter your height (cm)"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="weight"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Weight</FormLabel>
                <FormControl>
                  <Input
                    id="height"
                    type="number"
                    min={0}
                    {...field}
                    placeholder="Enter your weight (kg)"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="age"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Age</FormLabel>
                <FormControl>
                  <Input
                    id="height"
                    type="number"
                    min={0}
                    {...field}
                    placeholder="Enter your age"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Gender</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="activity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Physical Activity Level</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Activity Level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily-active">Daily Active</SelectItem>
                      <SelectItem value="less-active">Less Active</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="water"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Daily Water Intake</FormLabel>
                <FormControl>
                  <Input
                    id="height"
                    type="number"
                    min={0}
                    {...field}
                    placeholder="Enter water intake in (L/day)"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="space-y-4 col-span-2">
            <div className="flex items-center justify-between">
              {response && (
                <div>
                  <h2 className="text-2xl font-bold">Your BMI</h2>
                  <p className="font-medium">{Number(bmi) > 31 && Number(bmi) < 16  ? bmi?.toFixed(2) : "Your Height and Weight Seems Unusual, Check and enter properly"}</p>
                </div>
              )}
              <Button>Check Health Condition</Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default HealthForm;
