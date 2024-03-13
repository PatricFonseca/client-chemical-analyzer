import React from "react";

export function NavBar() {
  function changeTheme(theme: string) {
    document.querySelector("html")?.setAttribute("data-theme", theme);
  }

  return (
    <header className="flex justify-between align-center p-2 bg-secondary">
      <h1 className="text-3xl font-bold">Aurora project</h1>
      <select
        name="themes"
        id="themes"
        className="text-zinc-800 rounded colors bg-rose-100 p-2 border"
        onChange={(e) => changeTheme(e.target.value)}
      >
        <option value="">Original</option>
        <option value="dark-theme">Tema escuro</option>
      </select>
    </header>
  );
}
