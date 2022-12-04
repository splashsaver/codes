export const Button = (
  props: React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >
) => {
  return (
    <button
      className="flex items-center justify-center outline-none bg-slate-700 rounded p-1 px-4 focus:ring"
      {...props}
    >
      {props.children}
    </button>
  );
};
