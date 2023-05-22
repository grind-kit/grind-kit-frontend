import Navigation from "./navigation";
const loadStrings = require("@/locales/en/strings");

export default function Layout(props: any) {
  const strings = loadStrings;

  return (
    <body className="flex flex-col min-h-screen">
      <Navigation />
      <main className="container flex flex-1 justify-center mx-auto px-5 max-w-screen-lg">
        {props.children}
      </main>
      <footer className="flex items-center justify-center w-full h-20 text-sm border-t">
        <p>
          &copy; {new Date().getFullYear()} {strings.FOOTER_COPYRIGHT}
        </p>
      </footer>
    </body>
  );
}
