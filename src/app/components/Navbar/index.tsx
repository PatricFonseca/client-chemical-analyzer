import React from "react";

export function NavBar() {
  function changeTheme(theme: string) {
    document.querySelector("html")?.setAttribute("data-theme", theme);
  }

  return (
    <header className="flex justify-between p-2 bg-secondary">
      <h1>Navbar</h1>
      <select
        name="cars"
        id="cars"
        className="text-zinc-800 rounded colors bg-rose-100 p-2 border"
        onChange={(e) => changeTheme(e.target.value)}
      >
        <option value="dark-theme">Tema escuro</option>
        <option value="">Original</option>
      </select>
    </header>
  );
}
