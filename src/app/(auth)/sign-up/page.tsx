'use client';

import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const signUpSchema = z
  .object({
    email: z.email('Invalid email'),
    password: z
      .string()
      .min(6, 'Password must be at least 6 characters')
      .max(50, 'Password must be at most 50 characters'),
    confirmPassword: z.string()
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword']
  });

export default function SignUpPage() {
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: ''
    }
  });

  function onSubmit(data: z.infer<typeof signUpSchema>) {
    console.log(data);
  }

  return (
    <form id="sign-up-form" onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup>
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                aria-invalid={fieldState.invalid}
                placeholder="Wpisz adres email..."
                type="email"
                id="email"
                {...field}
              />
              {fieldState.invalid ? <FieldError errors={[fieldState.error]} /> : null}
            </Field>
          )}
        />

        <Controller
          name="password"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="password">Hasło</FieldLabel>
              <Input
                aria-invalid={fieldState.invalid}
                placeholder="Wpisz hasło..."
                type="password"
                id="password"
                {...field}
              />
              {fieldState.invalid ? <FieldError errors={[fieldState.error]} /> : null}
            </Field>
          )}
        />

        <Controller
          name="confirmPassword"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="confirmPassword">Powtórz hasło</FieldLabel>
              <Input
                aria-invalid={fieldState.invalid}
                placeholder="Wpisz hasło ponownie..."
                type="password"
                id="confirmPassword"
                {...field}
              />
              {fieldState.invalid ? <FieldError errors={[fieldState.error]} /> : null}
            </Field>
          )}
        />
      </FieldGroup>

      <Field orientation="horizontal">
        <Button type="button" variant="outline" onClick={() => form.reset()}>
          Wyczyść
        </Button>

        <Button type="submit" form="sign-up-form">
          {form.formState.isSubmitting ? 'Rejestrowanie...' : 'Zarejestruj się'}
        </Button>
      </Field>
    </form>
  );
}
