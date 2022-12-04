export const Input = (
  props: React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >
) => {
  return (
    <input
      className="flex items-center justify-center outline-none bg-slate-700 rounded p-1 px-4 focus:ring"
      {...props}
    />
  );
};
