'use client';

import { authClient } from '@/lib/auth-client';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { FormErrorAlert } from '../form-error-alert';
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const signInSchema = z.object({
  email: z.email('Invalid email'),
  password: z.string().nonempty('Password is required')
});

export default function SignInPage() {
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  async function onSubmit(data: z.infer<typeof signInSchema>) {
    await authClient.signIn.email(
      {
        email: data.email,
        password: data.password
      },
      {
        onError: ({ error, response }) => {
          if (error.status === 401) {
            form.resetField('password');
            return form.setError('password', { message: 'Nieprawidłowe hasło' });
          }

          // rate limiter
          if (error.status === 429) {
            const retryAfter = response.headers.get('X-Retry-After');
            return form.setError('root', {
              message: `Zbyt wiele prób logowania. Spróbuj ponownie za ${retryAfter} sekund.`
            });
          }

          console.error(error);
          form.setError('root', { message: 'Wystąpił błąd podczas logowania' });
        }
      }
    );
  }

  return (
    <form id="sign-in-form" onSubmit={form.handleSubmit(onSubmit)}>
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

        {form.formState.errors.root ? (
          <FormErrorAlert title="Błąd" message={form.formState.errors.root.message!} />
        ) : undefined}
      </FieldGroup>

      <Field orientation="horizontal">
        <Button type="button" variant="outline" onClick={() => form.reset()}>
          Wyczyść
        </Button>

        <Button type="submit" form="sign-in-form">
          {form.formState.isSubmitting ? 'Logowanie...' : 'Zaloguj się'}
        </Button>
      </Field>
    </form>
  );
}
