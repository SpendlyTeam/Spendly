interface AuthFormHeaderProps {
  title: string;
}

export function AuthFormHeader({ title }: AuthFormHeaderProps) {
  return (
    <>
      <h1 className="font-bold text-3xl mb-4 dark:text-white">{title}</h1>
    </>
  );
}
