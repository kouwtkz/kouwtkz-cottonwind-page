import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./routes/Root";
import Home from "./routes/Home";
import { CharaPage } from "./routes/CharaPage";
import { GalleryGroupPage, GalleryPage } from "./routes/GalleryPage";
import ErrorPage from "./routes/ErrorPage";
import { SoundPage } from "./routes/SoundPage";
import { ComicsViewer } from "./state/ComicsViewer";
import InfoPage from "./routes/InfoPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "character",
        element: <CharaPage />,
      },
      {
        path: "character/:name",
        element: <CharaPage />,
      },
      {
        path: "gallery",
        element: <GalleryPage />,
      },
      {
        path: "gallery/ebook",
        element: <ComicsViewer />,
      },
      {
        path: "gallery/:group",
        element: <GalleryGroupPage />,
      },
      {
        path: "sound",
        element: <SoundPage />,
      },
      {
        path: "info",
        element: <InfoPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);

function scrollLockHandle(e: Event) {
  if (document.body.classList.contains("scrollLock")) {
    let pD = e.target! as HTMLElement | null;
    while (pD && pD.clientHeight === pD.scrollHeight) {
      pD = pD.parentElement;
    }
    if (!pD || pD.classList.contains("scrollLock")) {
      e.preventDefault();
      e.stopPropagation();
    }
  }
}
const pf = { passive: false };

document.addEventListener("wheel", scrollLockHandle, pf);
document.addEventListener("touchmove", scrollLockHandle, pf);
