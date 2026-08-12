import Link from 'next/link';

export function Navigation() {
  return (
    <nav>
      <ul>
        <li>
          <Link href="/sign-in">Zaloguj</Link>
        </li>
        <li>
          <Link href="/sign-up">Rejestracja</Link>
        </li>
      </ul>
    </nav>
  );
}
