import {lazy} from "solid-js";
import preloadDetails from "../components/home-details/home-details.data";
import {RouteDefinition} from "@solidjs/router";

export const routes: RouteDefinition[] = [
  {
    path: "/",
    component: lazy(() => import("../components/home"))
  },
  {
    path: "/home",
    children: [
      {
        path: "/",
        component: lazy(() => import("../components/home"))
      },
      {
        path: "/details/:id?",
        component: lazy(() => import("../components/home-details/home-details.component")),
        preload: preloadDetails,
        matchFilters: {
          id: /^\d+$/
        }
      }
    ]
  },
  {
    path: "/about",
    component: lazy(() => import("../components/about"))
  },
  {
    path: "*404",
    component: lazy(() => import("../components/notFound/notFound.component"))
  }
];